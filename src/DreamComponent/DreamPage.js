import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import "../styles.css";

const { TextArea } = Input;

const DreamPage = () => {
  const [dreams, setDreams] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [explanation, setExplanation] = useState("");
  const [category, setCategory] = useState("");
  const [isEditDreamFormVisible, setIsEditDreamFormVisible] = useState(false);

  // Here we have state variables. dreams holds the array of objects. id, title, description, explanation and category are considered the object proprties, for example dreams.id, or dreams.title
  // isEditDreamFormVisible is a state variable used for toggling the state based on true/false

  // Helper Function # 1
  const updateDreamDetails = (id) => {
    setIsEditDreamFormVisible(true);
    // we update the state of isEditDreamFormVisible to true
    setIsEditDreamFormVisible(!isEditDreamFormVisible);
    // we create a toggle to update the state of the isEditDreamFormVisible based on a button click by using a bang operator.
    setId(id);
    // we are also updating the id based on the current id that we pass in
  };

  // the updateDreamDetails function has an id passed in and will update the state variable of isEditDreamVariable to false via setIsEditDreamVariable
  // the setIsEditDreamVariable uses a bang operator to change the boolean value from true to false
  // we are updating the id state with the current dream id

  // Helper Function # 2
  const handleTitle = (e) => {
    setTitle(e.target.value);
    // the title state will be updated by getting the current value of the input field which triggers the function.
    // updates the title state based on what is typed into the input box
  };

  // Helper Function # 3
  const handleDescription = (e) => {
    // the function takes in an event object.
    setDescription(e.target.value);
    // the description state will be updated by getting the current value of the input field which triggers the function.
    // updates the description state based on what is typed into the input field
  };

  // Helper Function # 4
  const handleExplanation = (e) => {
    setExplanation(e.target.value);
  };

  // the function takes in an event object. the title state will be updated by getting the current value of the input field which triggers the function. updates the explanation state with anything that is types into the input box

  // Helper Function # 5
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  // this enables providing text input based on an event that grabs the value and sets that value based on a new category property

  // Helper Function # 6
  const handleDreamSubmit = async (e) => {
    // the function is async which means it will take time for it to complete.
    e.preventDefault();
    // this prevents the submit button from performing a default action
    const newDream = { title, description, explanation, category };
    // we create a variable called newDream which stores the properties of the dreams array.
    try {
      const dreamResp = await fetch(`http://localhost:8082/dreams`, {
        // we are making a fetch POST request to the URL localhost:8082 on the Spring backend server and the response we get back is stored in the dreamResp variable
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDream),
        // since this is a POST request, we are sending a body as part of the request being made, by turning the newDream object into JSON
      });

      if (!dreamResp.ok) {
        // this checks if the dreamResp is not okay, provides a 404 status or error code.
        throw new Error("Failed to add dream entry");
        // we are throwing a new error message that a new dream entry could not be added.
      }

      if (dreamResp.ok) {
        // this checks if the dreamResp is okay, and provides a 200 status code.
        const dreamResponse = await getDreams();
        // we call the getDreams function and store the result/response in a variable called dreamResponse
        setDreams(dreamResponse);
        // we update the dreams array by passing in the dreamResponse variable, since it holds the entire JSON data of the dreams array.
        setTitle("");
        // we clear out the title input when the form is submitted
        setDescription("");
        // we clear out the description input when the form is submitted
        setExplanation("");
        // we clear out the explanation input when the form is submitted
        setCategory("");
        // we clear out the category input when the form is submitted
      }
    } catch (error) {
      console.error("Error adding dream entry: ", error);
      // the catch will display an error message to the console detailing the reason for the error
    }
  };

  // Helper Function # 7
  const handleDreamUpdate = async (id) => {
    // the handleDreamUpdate function will pass an id since we are only updating one container at a time based on the dream UUID.
    const dreamPayload = { id, title, description, explanation, category };
    // we create a variable called dreamPayload which stores the dream object properties which includes the id, title, description, explanation and category.
    // notice how id is part of the object, since we are updating a container based on the current dream id passed in.

    try {
      const resp = await fetch(`http://localhost:8082/dreams/${id}`, {
        // we are making a fetch PUT request to the URL localhost:8082 on the Spring backend server and the response we get back is stored in the resp variable. the URL is passing in the current id
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dreamPayload),
        // since this is a PUT request, we are sending a body as part of the request, by turning the dreamPayload object into JSON
      });

      if (!resp.ok) {
        // this checks if the dreamResp is not okay, provides a 404 status or error code.
        throw new Error("Failed to update dream details");
        // we are throwing a new error message that a dream entry could not be updated.
      }

      if (resp.ok) {
        // this checks if the resp is okay, and provides a 200 status code.
        const dreamResponse = await getDreams();
        // we call the getDreams function and store the result/response in a variable called dreamResponse
        setDreams(dreamResponse);
        // we update the dreams array and pass in dreamResponse variable, since it holds the fetched dream JSON response
        setId("");
        // we clear out the old id and pass in a new id after the update button is clicked
        setTitle("");
        // we clear out the title input when the form is submitted
        setDescription("");
        // we clear out the description input after the update button is clicked
        setExplanation("");
        // we clear out the explanation input after the update button is clicked
        setCategory("");
        // we clear out the category input after the update button is clicked
        setIsEditDreamFormVisible(false);
        // we set the state isEditDreamFormVisible to false so when the update button is clicked, the form will be hidden
      }
    } catch (error) {
      // the catch will display an error messages to the console, the dream details cannot be updated at this time.
      console.error("Error updating dream entry:", error);
    }
  };

  // Helper Function # 8
  const deleteDream = async (id) => {
    // this method deletes a dream entry based on the id passed in.
    try {
      const response = await fetch(`http://localhost:8082/dreams/${id}`, {
        // create a variable called response to make a HTTP Delete fetch request to the URL on the Spring server, with the id
        method: "DELETE",
      });

      if (response.ok) {
        // checks if the response returns a 200 HTTP status code
        setDreams(dreams.filter((dream) => dream.id !== id));
        // we are updating the dreams array by using the filter function and filtering out the dream.id that does not match the current id that is passed in. this will delete the entry
      } else {
        throw new Error("Failed to delete dream entry");
        // otherwise throw an error that tells the user a dream entry cannot be deleted
      }
    } catch (error) {
      // the catch will display an error message on the console, that the dream can't be removed
      console.error("Error deleting dream: ", error);
    }
  };

  // Helper Function # 9
  const getDreams = async () => {
    // the getDreams function will fetch the dreams data from the backend Spring server
    try {
      const resp = await fetch(`http://localhost:8082/dreams`);
      // create a resp variable and make a fetch request to the URL on the Spring server. store the result/response in the resp variable
      const body = await resp.json();
      // create a body variable the stores the JSON response
      return body;
      // return the JSON response
    } catch (error) {
      // display an error message to the console
      console.error("Error fetching dream data", error);
    }
  };

  // Helper Function # 10
  // The useEffect will be executed once when the page reloads due to the dependency array '[]' being empty.
  useEffect(() => {
    const fetchDreamData = async () => {
      // Create a function called fetchDreamData()
      const dreamResponse = await getDreams();
      // We make a call to the getDreams() function and storing the result in the dreamResponse variable.
      // Remember, getDreams() returns a JSON response of the dreams data from the backend Spring Server
      setDreams(dreamResponse);
      // We update the dreams array with the dreamResponse variable.
    };
    fetchDreamData();
    // We call the fetchDreamsData() function which will display the dreams array data on the page when the page re-renders.
    // [] - the dependency array is empty since no state variable is being changed from the page being reloaded
  }, []);

  return (
    // form-wrapper
    // We have a class called form wrapper which displays four form fields using Antd.
    // The form has an onSubmit event which calls the handleDreamSubmit function when the form is submitted. The form is submitted, when the "Save Dream Entry" button is clicked.
    // Let's take a close look at the handleDreamSubmit function
    // The first one is form.item and it provides a label.
    // The second one is Input which provides text input from an input box. The input box has an onChange event which calls the function 'handleTitle
    // The third is TextArea which provides text input from a text area box. The text area box has an autoSize style which determines the width and height of the text box

    // dream-container
    // We have a dream-container class which provides a container for the data being stored.
    // We have a dreams array which consists of an array of objects with 5 properties: ID, title, description, explanation, and category.
    // We map the dreams array and display the properties to the container using dream.id or dream.title for example. Access the specific property of the dreams array.
    // Each container is divided into separate classes, including dream-section, dream-heading, and dream-content. The dream-item displays each item based on the unique ID.
    // The dream-content-container wraps the dream-section class, dream-section wraps the dream-heading and dream-content classes, for each container respectively.
    // This is repeated 5 times, for each property. The dream-content displays the property as JSX using curly brackets. This will display the value of the property.

    // button-container
    // Next we have a button container, which provides two more buttons. The first button is 'Update Dream Entry' which has an onClick event that calls the updateDreamDetails function with the
    // dream.id passed in. Passing in the dream.id allows you to delete or update individual containers one at a time based on the ID specified.
    // Lets take a look at the updateDreamDetails function.
    // Next we have the Delete dream Entry button which calls the deleteDream function with the dream.id passed in.

    // update-form
    // Last we have the update-form class. The class has the isEditDreamFormVisible state is based on a boolean (true/false) value and a toggle function.
    // The isEditDreamFormVisible checks if the current ID matches the dream ID passed in.
    // The isEditDreamFormVisible displays the form only if the state is true aka conditional rendering.
    // It hides the form, if the state is false. This is controlled by the updateDreamDetails function.
    // When the 'Update' button is clicked, the handleDreamUpdate function is called, which wil update the contents of the dream-container with the user input
    // let's take a look at the handleDreamUpdate function.

    <>
      <h1>Dream Mentor</h1>
      <div className="key-container">
        <h4>Key</h4>
        <div className="key-content">
          <p>
            <strong>Dream Title</strong>
          </p>
          <p>
            This represents what your dream is called. It is unique only to you,
            so picking a title that represents your dream is important
          </p>
          <p>
            <strong>Dream Description</strong>
          </p>
          <p>
            This represents what your dream was about. You can include details
            about certain things including:
          </p>
          <ul>
            <li>What was your dream about?</li>
            <li>
              Did your dream have a beginning, a middle or an end? Describe in
              detail
            </li>
            <li>
              Who was in your dream? For example, characters or people
              throughout your life, people you interacted with or people who
              have been close to you.
            </li>
            <li>
              Which setting did your dream take place in? The setting can be
              anywhere
            </li>
          </ul>
          <p>
            <strong>Dream Explanation</strong>
          </p>
          <p>
            Provide a detailed explanation of your dream. Focus on including
            these details
          </p>
          <ul>
            <li>Why were you dreaming about this?</li>
            <li>
              Was the dream based on an experience from the past, present or
              future?
            </li>
            <li>
              Was the dream based on an emotional response to something in your
              life? Were you scared, happy, tensed, angry, sad?
            </li>
            <li>
              When you woke up from your dream, how did you feel? Were you able
              to remember what you dreamt about the next morning?
            </li>
          </ul>
          <p>
            <strong>Dream Category</strong>
          </p>
          <p>
            Sort your dreams into one of these five categories, which include
            the following:
          </p>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="form-wrapper">
          <form onSubmit={handleDreamSubmit}>
            <Form.Item
              className="form-label-1"
              layout="vertical"
              label="Dream Title"
              name="Dream Title"
              // style={{span: 6, width: 500}}
            />
            <Input
              className="form-box-1"
              type="text"
              id="title"
              value={title}
              onChange={handleTitle}
            />
            <br />
            <br />
            <Form.Item
              className="form-label-2"
              layout="vertical"
              label="Dream Description"
              name="Dream Description"
            />
            <TextArea
              className="text-area-1"
              autoSize={{ minRows: 5, maxRows: 10 }}
              value={description}
              onChange={handleDescription}
            />
            <br />
            <br />
            <Form.Item
              className="form-label-3"
              layout="vertical"
              label="Dream Explanation"
              name="Dream Explanation"
            />
            <TextArea
              className="text-area-2"
              autoSize={{ minRows: 5, maxRows: 10 }}
              value={explanation}
              onChange={handleExplanation}
            />
            <br />
            <br />
            <Form.Item
              className="form-label-4"
              layout="vertical"
              label="Dream Category"
              name="Dream Category"
            />
            <Input
              className="form-box-2"
              type="text"
              id="category"
              value={category}
              onChange={handleCategory}
            />
            <br />
            <br />
            <button type="submit" className="button-1">
              Save Dream Entry
            </button>
          </form>
        </div>
      </div>
      <br />
      <div className="dream-container">
        {dreams?.map((dream) => (
          <>
            <div className="dream-item" key={dream.id}>
              <div className="dream-content-container">
                <div className="dream-section">
                  <h2 className="dream-heading">Dream ID</h2>
                  <div className="dream-content">{dream.id}</div>
                </div>

                <div className="dream-section">
                  <h2 className="dream-heading">Dream Explanation</h2>
                  <div className="dream-content scrollable-content">
                    {dream.explanation}
                  </div>
                </div>

                <div className="dream-section">
                  <h2 className="dream-heading">Dream Description</h2>
                  <div className="dream-content scrollable-content">
                    {dream.description}
                  </div>
                </div>

                <div className="dream-section">
                  <h2 className="dream-heading">Dream Title</h2>
                  <div className="dream-content">{dream.title}</div>
                </div>

                <div className="dream-section">
                  <h2 className="dream-heading">Dream Category</h2>
                  <div className="dream-content">{dream.category}</div>
                </div>
              </div>
            </div>

            <div className="button-container">
              <button
                type="btn"
                className="btn-2"
                onClick={() => updateDreamDetails(dream.id)}
              >
                Update Dream Entry
              </button>
              <button
                type="btn"
                className="btn-3"
                onClick={() => deleteDream(dream.id)}
              >
                Delete Dream Entry
              </button>
            </div>

            <div className="update-form">
              {isEditDreamFormVisible && id === dream.id && (
                <div>
                  <form>
                    <Form.Item
                      className="update-label-1"
                      layout="vertical"
                      label="Update Title"
                      name="Update Description"
                      // style={{span: 6, width: 500}}
                    />
                    <Input
                      className="form-box-2"
                      type="text"
                      id="category"
                      value={title}
                      onChange={handleTitle}
                    />
                    <Form.Item
                      className="update-label-1"
                      layout="vertical"
                      label="Update Description"
                      name="Update Description"
                      // style={{span: 6, width: 500}}
                    />
                    <TextArea
                      className="update-textarea-1"
                      autoSize={{ minRows: 5, maxRows: 10 }}
                      value={description}
                      onChange={handleDescription}
                    />
                    <br />
                    <Form.Item
                      className="update-label-2"
                      layout="vertical"
                      label="Update Explanation"
                      name="Update Explanation"
                      // style={{span: 6, width: 500}}
                    />
                    <TextArea
                      className="update-textarea-2"
                      autoSize={{ minRows: 5, maxRows: 10 }}
                      value={explanation}
                      onChange={handleExplanation}
                    />
                    <Form.Item
                      className="update-label-1"
                      layout="vertical"
                      label="Update Category "
                      name="Update Description"
                      // style={{span: 6, width: 500}}
                    />
                    <Input
                      className="form-box-2"
                      type="text"
                      id="category"
                      value={category}
                      onChange={handleCategory}
                    />
                  </form>
                  <button
                    type="submit"
                    className="save-btn"
                    onClick={() => handleDreamUpdate(id)}
                  >
                    Update Changes
                  </button>
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default DreamPage;
