import { collectionGroup } from "firebase/firestore";
import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { useQueryClient } from "react-query";
import { AuthContext } from "../../context/AuthContext";
import UserInfo from "../UserInfo";

const UserControl = () => {
	const { currentUser, setAuthenticated, setCurrentUser } = useContext(AuthContext);
	const queryClient = useQueryClient();
	const signout = () => {
		queryClient.removeQueries({ queryKey: ["auth"], exact: true });
		queryClient.removeQueries({ queryKey: ["chats"], exact: true });
		setAuthenticated(false);
		setCurrentUser(null);
		localStorage.clear();
	};
	return (
		<div className="flex justify-between items-center h-fit px-0 mb-10">
			<UserInfo avatar={currentUser?.avatar} username={currentUser?.username} text="online" status={true} />

			<div className="tooltip tooltip-bottom tooltip-primary" data-tip="Sign out">
				<button className="btn btn-ghost text-xl" onClick={signout}>
					<CiLogout />
				</button>
			</div>
		</div>
	);
};

export default UserControl;
