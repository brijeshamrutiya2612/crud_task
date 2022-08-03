import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const ViewData = () => {
  const [userView, setUserView] = useState([]);
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/userdata/get");
        setPages(res.data)
        setUserView(res.data.users);
      } catch (err) {
        toast.error(err);
      }
    };
    getUserData();
  }, []);
console.log(pages.pages)
  const userDelet = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/userdata/${id}`);
    const updateView = userView.filter((user) => {
      return user._id !== id;
    });
    setUserView(updateView);
  };
  const addRecord = () =>{
    navigate('/')
  }

  const fetchUser = async (currentPage) => {
        const res = await axios.get(`http://localhost:5000/api/userdata/get?_page=${currentPage}`)
        const data = await res.data
        return data;
  }
  const handlePageClick = async (data) =>{
    console.log(data.selected)

    let currentPage = data.selected + 1 
    const userFormServer = await fetchUser(currentPage)
  }


  return (
    <div className="container my-4"
    style={{
        border:"2px solid"
        
    }}>
      <div className="pt-2 pb-2" style={{}}>
        <div className="text-center">
        <Button className="col-lg-5 my-4" variant="success" onClick={addRecord}>Add User</Button>
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
            {userView.map((view, i) => {
              return (
                <Card key={view._id} className="m-2 text-center" style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>
                      {view.firstname} {view.lastname}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {view.email}
                    </Card.Subtitle>
                    <Card.Text>{view.address}</Card.Text>
                    <Card.Text>{view.mobile}</Card.Text>
                    <Link
                      to={`/EditData/${view._id}`}
                      style={{ color: "#000000", textDecoration: "none" }}
                    >
                      <Button>Edit</Button>
                    </Link>
                    <Button
                      variant="danger"
                      style={{ marginLeft: "2em" }}
                      onClick={() => userDelet(view._id)}
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
            {userView
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
                return <>
                 <Card key={serchView._id} className="m-2" style={{ width: "18rem" }}>
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
                </>;
              })}
          </div>
        )}
        <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={pages.pages}
        marginPagesDisplayed={3}
        pageRangeDisplayed={6}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default ViewData;
