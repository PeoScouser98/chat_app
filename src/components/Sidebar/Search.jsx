import _ from "lodash";
import { useState } from "react";
import { BsChatSquareText, BsSearch } from "react-icons/bs";

import Avatar from "../Avatar";

import { useContext } from "react";
import tw from "tailwind-styled-components";
import { findChat, findUserChat } from "../../api/chat.api";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useQuery } from "react-query";
import { useRef } from "react";
import Loading from "../Loading";
import { AppContext } from "../../context/AppContext";

const SearchControl = tw.div`flex justify-start items-center gap-2 bg-base-200 px-4 py-2 rounded-md `;
const SearchInput = tw.input`input input-sm focus:outline-none bg-inherit flex-1`;
const SearchResults = tw.ul`dropdown-content menu shadow w-full absolute mt-1 rounded-md bg-base-100`;

const Search = () => {
	const [results, setResults] = useState([]);
	const { currentUser } = useContext(AuthContext);
	const [keywords, setKeywords] = useState("");
	const { createNewChatMutation } = useContext(ChatContext);
	const { setCurrentChat } = useContext(AppContext);
	const inputRef = useRef();

	const { data, isFetching, isError } = useQuery({
		queryKey: ["searchUserChat", keywords],
		queryFn: () => findUserChat(keywords),
	});

	const debounceSearch = _.debounce(() => {
		setKeywords(inputRef.current.value);
		setResults(data);
	}, 1000);
	const handleSelect = async (user) => {
		const res = await findChat(user);
		if (res.status === 200) {
			setCurrentChat(res);
		}
		if (res.status === 404) {
			createNewChatMutation.mutate({
				members: [currentUser, user],
				messages: [],
			});
		}
	};

	return (
		<div className="dropdown mb-6">
			<SearchControl tabIndex={0}>
				<BsSearch />
				<SearchInput type="text" placeholder="Find an user ..." ref={inputRef} onChange={debounceSearch} />
				{isFetching && <Loading />}
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
