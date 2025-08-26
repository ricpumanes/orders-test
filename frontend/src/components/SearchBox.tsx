type Props = {
  onSearch: (searchTerm: string) => void;
};

export default function SearchBox({ onSearch }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(event.currentTarget.search.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-1 items-center gap-2 w-full"
    >
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search by product name..."
        className="border border-gray-500 p-2 mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Search
      </button>
    </form>
  );
}
