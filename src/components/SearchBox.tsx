interface SearchBoxProps {
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchBtnClick: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  handleSearchBtnClick,
  handleSearchInputChange,
}) => {
  return (
    <form
      className="flex pe-[2vw]"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchBtnClick();
      }}
    >
      <input
        onChange={handleSearchInputChange}
        className="bg-white-900 rounded-[2vw] ml-[8vw] mt-[0.3vw] mr-[2vw] w-[48.5vw] h-[3vw] mb-[2vw] pl-[1.5vw] text-[1.5vw]"
      />
      <button
        onClick={handleSearchBtnClick}
        className="rounded-[1vw] bg-purple w-[8vw] h-[4vw] hover-effect hover:bg-purple2 text-[1.5vw] font-bold"
      >
        검색
      </button>
    </form>
  );
};

export default SearchBox;
