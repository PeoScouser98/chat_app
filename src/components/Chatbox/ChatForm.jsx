// libraries
import { useState, useRef, useEffect, useContext } from "react";
import tw from "tailwind-styled-components";
import EmojiPicker from "emoji-picker-react";
import { useForm } from "react-hook-form";
// components
import { BiImageAdd } from "react-icons/bi";
import { FaRegPaperPlane } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import Tooltip from "../Tooltip";
// context
import { AppContext } from "@/context/AppContext";
import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
// functions
import uploadImage from "@/firebase/upload";

const Form = tw.form`relative w-full flex justify-between items-center p-1 `;
const FormInput = tw.input`input input-bordered flex-1 focus:boder-2 focus:border-primary focus:outline-none text-white`;
const FormButtonGroup = tw.div`flex justify-end items-center gap-4 absolute top-1/2 -translate-y-1/2 right-2`;

const ChatForm = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm();
	const { currentUser } = useContext(AuthContext);
	const { currentChat, socket } = useContext(AppContext);
	const { sendMessageMutation } = useContext(ChatContext);
	const chatInputRef = useRef(null);
	const [cursorPosition, setCursorPosition] = useState(0);
	const { ref } = register("text", { required: true });

	// set current cursor position of input
	useEffect(() => {
		chatInputRef.current.selectionEnd = cursorPosition;
	}, [cursorPosition]);

	// add emoji into message
	const addEmoji = ({ emoji }) => {
		chatInputRef.current.focus();
		const message = chatInputRef.current.value; // current message
		const leftOfCursorVal = message.substring(0, chatInputRef.current.selectionStart); // text on left side of cursor
		const rightOfCursorVal = message.substring(chatInputRef.current.selectionStart); // text on right side of cursor
		chatInputRef.current.value = leftOfCursorVal + emoji + rightOfCursorVal;
		setCursorPosition(leftOfCursorVal.length + emoji.length);
		console.log("current cursor position:>>>>", cursorPosition);
	};
	// send message
	const handleSendMessage = async (data) => {
		try {
			console.log(data);
			if (data.text.length === 0 && data.file.length === 0) return;
			if (data.file.length === 0) {
				delete data.file;
			} else {
				data.file = await uploadImage(data.file[0]);
				console.log("attach image :>> ", data.file);
			}
			sendMessageMutation.mutate({
				chatId: currentChat._id,
				message: {
					sender: currentUser._id,
					...data,
				},
			});
			reset();
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<Form onSubmit={handleSubmit(handleSendMessage)}>
			<FormInput
				placeholder="Message ..."
				{...register("text", { required: false })}
				ref={(e) => {
					ref(e);
					chatInputRef.current = e;
				}}
			/>
			<FormButtonGroup>
				<div className="dropdown dropdown-hover dropdown-top dropdown-end">
					<label tabIndex={0} className="text-xl mt-1 hover:text-white">
						<BsEmojiSmile aria-hidden />
					</label>

					<div tabIndex={0} className="dropdown-content w-fit py-4">
						<EmojiPicker theme="dark" lazyLoadEmojis={true} onEmojiClick={addEmoji} />
					</div>
				</div>
				<Tooltip dataTip="Attach image">
					<label htmlFor="image" className="text-xl hover:text-white">
						<BiImageAdd aria-hidden />
						<input type="file" className="hidden" id="image" {...register("file", { required: false })} />
					</label>
				</Tooltip>
				<button className="btn btn-primary btn-sm gap-2">
					<FaRegPaperPlane aria-hidden /> Send
				</button>
			</FormButtonGroup>
		</Form>
	);
};

export default ChatForm;
