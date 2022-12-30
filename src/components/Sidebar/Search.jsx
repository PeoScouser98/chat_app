import _ from "lodash";
import { useState } from "react";
import { BsChatSquareText, BsSearch } from "react-icons/bs";

import Avatar from "../Avatar";
import Loading from "../Loading";

import tw from "tailwind-styled-components";
import { createNewChat, findChat, findUserChat } from "../../api/chat.api";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const SearchControl = tw.div`flex justify-start items-center gap-2 bg-base-200 px-4 py-2 rounded-md`;
const SearchInput = tw.input`input input-sm focus:outline-none bg-inherit`;
const SearchResults = tw.ul`dropdown-content menu shadow w-full absolute mt-1 rounded-md bg-base-100`;

const Search = () => {
	const [results, setResults] = useState([]);
	const { currentUser } = useContext(AuthContext);
	const findUser = _.debounce(async (e) => {
		const res = await findUserChat(e.target.value);
		if (Array.isArray(res)) {
			setResults(res);
		}
	}, 1000);

	const handleSelect = async (user) => {
		// if there is no chat with this user -> create new
		const existedChat = await findChat(user);
		if (existedChat) {
			setCurrentChat(existedChat);
		} else {
			const newChat = await createNewChat();
		}
		// if there exist chat with this user -> set current chat
	};

	return (
		<div className="dropdown mb-6">
			<SearchControl tabIndex={0}>
				<BsSearch />
				<SearchInput type="text" placeholder="Find an user ..." onChange={(e) => findUser(e)} />
			</SearchControl>
			<SearchResults tabIndex={0}>
				{results.map((user, index) => {
					return (
						<li onClick={() => handleSelect(user)} key={index}>
							<div className="flex justify-between items-center gap-5">
								<div className="flex items-center gap-3">
									<Avatar style={{ width: "32px", height: "32px" }} imageUrl={user?.avatar} />
									<h3>{user?.username}</h3>
								</div>
								<BsChatSquareText className="text-lg" />
							</div>
						</li>
					);
				})}
			</SearchResults>
		</div>
	);
};

export default Search;
