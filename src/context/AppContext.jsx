import "https://unpkg.com/peerjs@1.4.7/dist/peerjs.min.js";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);
	const [currentChat, setCurrentChat] = useState(null);

	const [chattingUser, setChattingUser] = useState(null);

	const [callStatus, setCallStatus] = useState(false); // status -> open or clost video call modal
	const [callAccepted, setCallAccepted] = useState(false); // status that call is accepted by chatting user or not
	const [commingCall, setCommingCall] = useState(); // call data including Call maker & Call listener

	const instancePeer = useRef(null); // instance peer connection
	const remoteVideoRef = useRef(null); // remote video ref
	const currentUserVideoRef = useRef(null); // current user video ref

	const [stream, setStream] = useState(null);
	const [remoteStream, setRemoteStream] = useState(null);

	const socket = useMemo(() => io(import.meta.env.VITE_SERVER));

	useEffect(() => {
		console.log("vite server :>> ", import.meta.env.VITE_SERVER);
		socket.emit("online", currentUser);

		socket.on("receive_invitation", (data) => {
			toast(data.message, {
				position: "top-center",
			});
		});

		//  show video call modal if exist incoming call
		socket.on("get_call", (data) => {
			setCurrentChat(data.currentChat);

			navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {
				setStream(mediaStream);
				currentUserVideoRef.current.srcObject = mediaStream;
				currentUserVideoRef.current.play();
			});
			setCommingCall(data);
			setCallStatus(true);
		});
		socket.on("call_response", (data) => {
			setCallStatus(true);
			setCallAccepted(true);
			remoteVideoRef.current.srcObject = remoteStream;
			remoteVideoRef.current.play();
		});
		socket.on("end_call", (data) => {
			setCallStatus(data.signal);
			setCallAccepted(data.signal);
			setCommingCall(undefined);
			if (stream) {
				const mediaTracks = stream.getTracks();
				mediaTracks.forEach((track) => track.stop());
			}
		});
		return () => {
			socket.off("notify_user_online");
			socket.off("receive_invitation");
			socket.off("get_call");
			socket.off("call_response");
		};
	}, [socket, currentChat]);

	useEffect(() => {
		const peer = new Peer(localStorage.getItem("auth"));
		peer.on("open", () => {
			console.log("my peer id:>>>", peer.id);
		});

		// handle stream on listening call event
		peer.on("call", (call) => {
			const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

			getUserMedia({ video: true, audio: true }, (mediaStream) => {
				setStream(mediaStream);
				currentUserVideoRef.current.srcObject = mediaStream;
				currentUserVideoRef.current.play();

				call.answer(mediaStream);
				call.on("stream", function (remoteStream) {
					console.log(remoteStream);
					setRemoteStream(remoteStream);
					remoteVideoRef.current.srcObject = remoteStream;
					remoteVideoRef.current.play();
				});
			});
		});
		instancePeer.current = peer;
	}, []);

	// * make video call
	const makeVideoCall = (currentChat) => {
		setCallStatus(true);

		socket.emit("call_user", {
			sender: currentUser,
			receiver: currentChat.chattingUser,
			currentChat: { ...currentChat, chattingUser: currentUser },
		});
		const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		getUserMedia({ video: true, audio: true }, (mediaStream) => {
			// show media stream of call maker user
			setStream(mediaStream);
			currentUserVideoRef.current.srcObject = mediaStream;
			currentUserVideoRef.current.play();

			// show remote media stream of call listener
			const call = instancePeer.current.call(currentChat.chattingUser?._id, mediaStream);
			call.on("stream", (remoteStream) => {
				console.log("remoteStream :>> ", remoteStream);
				remoteVideoRef.current.srcObject = remoteStream;
				remoteVideoRef.current.play();
			});
		});
	};

	// * answer the call
	const answerCall = () => {
		setCallAccepted(true);
		socket.emit("answer_call", {
			receiver: commingCall.sender,
			signal: true,
		});
	};

	// * end the call
	const endCall = () => {
		setCallAccepted(false);
		setCallStatus(false);
		setCommingCall(undefined);
		const mediaTracks = stream.getTracks();
		mediaTracks.forEach((track) => track.stop());
		socket.emit("end_call", {
			receiver: currentChat.chattingUser,
			signal: false,
		});
	};

	const toggleMic = (e) => {
		try {
			const mediaStreams = stream.getTracks();
			mediaStreams[0].enabled = !e.target.checked;
		} catch (error) {
			console.log("error:>>", error.message);
		}
	};
	const toggleCamera = (e) => {
		const mediaStreams = stream.getTracks();
		mediaStreams[1].enabled = !e.target.checked;
	};

	return (
		<AppContext.Provider
			value={{
				socket,
				stream,
				currentChat,
				chattingUser,
				commingCall,
				callAccepted,
				callStatus,
				instancePeer,
				remoteVideoRef,
				currentUserVideoRef,
				setCurrentChat,
				setChattingUser,
				setCallData: setCommingCall,
				setCallAccepted,
				setCallStatus,
				makeVideoCall,
				answerCall,
				endCall,
				toggleMic,
				toggleCamera,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext };
export default AppProvider;
