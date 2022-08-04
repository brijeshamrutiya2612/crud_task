import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const ViewData = () => {
  const [userView, setUserView] = useState([]);
  const [pages, setPages] = useState([]);
  const [searchUserData, setSearchUserData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {

      //// Pagination Part ///////
      try {
        const res = await axios.get(`http://localhost:5000/api/userdata/pagination`);
        setUserView(res.data.users);
        setPages(res.data);
      } catch (err) {
        toast.error(err);
      }
      
      //// Get User Data For Search ///////

      try {
        const res = await axios.get(`http://localhost:5000/api/userdata/get`);
        setSearchUserData(res.data);
      } catch (err) {
        toast.error(err);
      }
    };
    getUserData();
  }, []);

  const fetchUser = async (currentPage) => {
    const res = await axios.get(
      `http://localhost:5000/api/userdata/pagination?page=${currentPage}`
    );
    const data = await res.data;
    return data;
  };

  /// Get Current Page No & Send to URI ////
  
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    const userFormServer = await fetchUser(currentPage);
    setUserView(userFormServer.users)
  };

  const userDelet = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/userdata/${id}`);
    const updateView = userView.filter((user) => {
      return user._id !== id;
    });
    setUserView(updateView);
  };
  const addRecord = () => {
    navigate("/add");
  };


  return (
    <div
      className="container my-4"
      style={{
        border: "2px solid",
      }}
    >
      <div className="pt-2 pb-2" style={{}}>
        <div className="text-center">
          <Button
            className="col-lg-5 my-4"
            variant="success"
            onClick={addRecord}
          >
            Add User
          </Button>
        </div>
        <Form className="d-flex col-lg-3 mx-auto my-4">
          <Form.Control
            type="search"
            placeholder="Search by product, category..."
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
      </div>
      <div className="row text-center">
        {search === "" ? (
          <>
            {userView.map((viewUser, i) => {
              return (
                <Card
                  key={viewUser._id}
                  className="m-2 text-center"
                  style={{ width: "18rem" }}
                >
                  <Card.Body>
                    <Card.Title>
                      {viewUser.firstname} {viewUser.lastname}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {viewUser.email}
                    </Card.Subtitle>
                    <Card.Text>{viewUser.address}</Card.Text>
                    <Card.Text>{viewUser.mobile}</Card.Text>
                    <Link
                      to={`/EditData/${viewUser._id}`}
                      style={{ color: "#000000", textDecoration: "none" }}
                    >
                      <Button>Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      style={{ marginLeft: "2em" }}
                      onClick={() => userDelet(viewUser._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </>
        ) : (
          <div className="row">
            {searchUserData
              .filter((itm) => {
                if (search == "") {
                  return itm;
                } else if (
                  itm.firstname.toLowerCase().includes(search.toLowerCase())
                ) {
                  let final = [{ itm }];
                  return final;
                }
              })
              .map((serchView, i) => {
                return (
                  <>
                    <Card
                      key={serchView._id}
                      className="m-2"
                      style={{ width: "18rem" }}
                    >
                      <Card.Body>
                        <Card.Title>
                          {serchView.firstname} {serchView.lastname}
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {serchView.email}
                        </Card.Subtitle>
                        <Card.Text>{serchView.address}</Card.Text>
                        <Card.Text>{serchView.mobile}</Card.Text>
                        <Link
                          to={`/EditData/${serchView._id}`}
                          style={{ color: "#000000", textDecoration: "none" }}
                        >
                          <Button>Edit</Button>
                        </Link>
                        <Button
                          variant="danger"
                          style={{ marginLeft: "2em" }}
                          onClick={() => userDelet(serchView._id)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </>
                );
              })}
          </div>
        )}
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pages.pages}
        marginPagesDisplayed={3}
        pageRangeDisplayed={6}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center my-4"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ViewData;
