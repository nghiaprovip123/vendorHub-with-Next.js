const CategoriesForm = () => {
  return (
    <form onSubmit={() => null}>
      <div className="grid gap-4 mb-4 font-semibold">
        <div className="grid gap-1">
          <Label className="font-semibold" htmlFor="cid">Category ID</Label>
          <Input
            className="bg-white"
            id="cid"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            placeholder="category id"
          />
        </div>
        <div className="grid gap-1">
          <Label className="font-semibold" htmlFor="title">Title</Label>
          <Input
            className="bg-white"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="category title"
          />
        </div>
        <div className="grid gap-1">
          <Label className="font-semibold" htmlFor="image">Category Image</Label>
          <Input
            className="bg-white"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="category url"
          />
        </div>
      </div>
    </form>
  );
};

export default CategoriesForm;
