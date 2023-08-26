let taskList = [];

function index(req, res) {
  if (req.query.id - 1 >= taskList.length) {
    return res.status(400).json({
      status: 400,
      msg: "Not Found",
    });
  }

  let data;

  if (req.query.id) {
    data = taskList[req.query.id - 1];
  } else {
    data = taskList;
  }

  return res.status(200).json({
    status: 200,
    msg: "Success",
    data: data,
  });
}

function create(req, res) {
  const data = req.body;
  //   data.slug = data.title.toLowerCase().replace(" ", "-");

  taskList.push(data);

  return res.status(200).json({
    status: 200,
    msg: "Success",
    data: data,
  });
}

function update(req, res) {
  if (req.query.id - 1 >= taskList.length) {
    return res.status(400).json({
      status: 400,
      msg: "Not Found",
    });
  }

  const data = req.body;

  taskList[req.query.id - 1] = data;

  return res.status(200).json({
    status: 200,
    msg: "Success",
    data: data,
  });
}

function drop(req, res) {
  if (req.query.id - 1 >= taskList.length) {
    return res.status(400).json({
      status: 400,
      msg: "Not Found",
    });
  }

  taskList.splice(req.query.id - 1, 1);

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
