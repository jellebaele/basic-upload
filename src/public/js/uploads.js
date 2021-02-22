let getBaseUrl = () => {
  let currUrl = window.location;
  return currUrl.pathname.split("/")[1];
};

let deleteHandler = (deleteBtn) => {
  let id = deleteBtn.id;
  remove(id);
};

let remove = (id) => {
  fetch("/uploads/" + id, {
    method: "DELETE",
  })
    .then((response) => {
      location.reload();
    })
    .catch(() => {
      console.log("Delete unsucesfull");
    });
};

