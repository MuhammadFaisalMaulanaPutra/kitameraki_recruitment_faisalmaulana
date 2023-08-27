let taskList = [];
let id = 0;
const itemsPerPage = 5;

function index(req, res) {
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const data = taskList.slice(startIndex, endIndex);

  return res.status(200).json({
    status: 200,
    msg: "Success",
    data: data,
  });
}

function create(req, res) {
  const data = {
    id: id + 1,
    ...req.body,
  };

  taskList.push(data);

  id++;

  return res.status(200).json({
    status: 200,
    msg: "Success",
    data: data,
  });
}

function update(req, res) {
  const checkVal = taskList.filter((task) => task.id === Number(req.query.id));

  if (checkVal.length === 0) {
    return res.status(400).json({
      status: 400,
      msg: "Not Found",
    });
  }

  const data = {
    id: Number(req.query.id),
    ...req.body,
  };

  taskList[taskList.findIndex((task) => task.id === Number(req.query.id))] =
    data;

  return res.status(200).json({
    status: 200,
    msg: "Success",
    data: data,
  });
}

function drop(req, res) {
  const checkVal = taskList.filter((task) => task.id === Number(req.query.id));

  if (checkVal.length === 0) {
    return res.status(400).json({
      status: 400,
      msg: "Not Found",
    });
  }

  const index = taskList.findIndex((task) => task.id === Number(req.query.id));

  taskList.splice(index, 1);

  return res.status(200).json({
    status: 200,
    msg: "Success",
  });
}

module.exports = {
  index,
  create,
  update,
  drop,
};
