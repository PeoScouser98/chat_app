import React from "react";
import tw from "tailwind-styled-components";

const Form = tw.form`relative`;
const FormInput = tw.input`input input-borderd focus:boder-2 focus:border-primary`;
const FormButtonGroup = tw.div`flex justify-end items-center gap-2 absolute top-1/2 -translate-x-1/2`;

const ChatForm = () => {
	return (
		<Form>
			<FormInput />
			<FormButtonGroup>
				<button className="btn btn-primary">Send</button>
			</FormButtonGroup>
		</Form>
	);
};

export default ChatForm;
