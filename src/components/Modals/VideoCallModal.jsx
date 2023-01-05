import { AppContext } from "@/context/AppContext";
import React from "react";
import { useContext } from "react";
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from "react-icons/bs";
import { MdCall, MdCallEnd } from "react-icons/md";
import Avatar from "../Avatar";
import Swap from "../Swap";
import tw from "tailwind-styled-components";

const AvatarWrapper = tw.div`relative flex justify-center items-center p-1 bg-gradient-to-b from-primary via-secondary to-info rounded-full`;
const AvatarPing = tw.div`absolute w-20 h-20 rounded-full bg-base-content animate-ping`;
const Modal = tw.div`modal visible opacity-100 pointer-events-auto w-screen h-screen `;
const ModalWrapper = tw.div`modal-box glass`;

const ModalAction = tw.div`modal-action justify-center gap-2`;

const VideoCallModal = () => {
	const {
		toggleMic,
		toggleCamera,
		remoteVideoRef,
		currentUserVideoRef,
		callAccepted,
		currentChat,
		commingCall,
		endCall, // end call action
		answerCall, // answer call action
	} = useContext(AppContext);

	return (
		<Modal>
			<ModalWrapper>
				<div className={callAccepted ? "relative w-full h-56" : "hidden"}>
					<video ref={remoteVideoRef} className="w-full h-full object-cover rounded-lg shadow-2xl"></video>
					<video
						ref={currentUserVideoRef}
						className="absolute w-24 h-20 top-0 left-0 z-[99] ring ring-success object-cover rounded-lg"
						muted
					></video>
				</div>
				<div className={callAccepted ? "hidden" : "flex flex-col items-center gap-4"}>
					<AvatarWrapper>
						<AvatarPing />
						<Avatar imageUrl={currentChat.chattingUser?.avatar} size={32} />
					</AvatarWrapper>
					<h4 className="text-xl font-medium">{currentChat.chattingUser?.username}</h4>
				</div>

				<ModalAction>
					{!callAccepted && commingCall && (
						<button className="btn btn-success btn-circle text-xl" onClick={answerCall}>
							<MdCall aria-hidden />
						</button>
					)}
					<button className="btn btn-error btn-circle text-xl" onClick={endCall}>
						<MdCallEnd aria-hidden />
					</button>
					<Swap tw="btn btn-circle text-xl" swapOn={<BsMicMute />} swapOff={<BsMic />} handleChange={toggleMic} />
					<Swap
						tw="btn btn-circle text-xl"
						swapOn={<BsCameraVideoOff />}
						swapOff={<BsCameraVideo />}
						handleChange={toggleCamera}
					/>
				</ModalAction>
			</ModalWrapper>
		</Modal>
	);
};

export default VideoCallModal;
