import { Models } from "appwrite";
import React from "react";
import Loader from "./Loader";
import GirdPostList from "./GirdPostList";

type SearchResultProps = {
  isSearchFetching: boolean;
  searchPost: Models.Document;
};
const SearchResult = ({ isSearchFetching, searchPost }: SearchResultProps) => {
  if (isSearchFetching) return <Loader />;

  if (searchPost && searchPost.documents.length > 0)
    return <GirdPostList posts={searchPost.documents || []} />;
  return (
    <div className="text-light-4 mt-10 text-center w-full">
      No results found
    </div>
  );
};

export default SearchResult;
