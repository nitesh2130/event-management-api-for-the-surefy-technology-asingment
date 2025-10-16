import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/Apiresponse.js";
import { userInEventModel } from "../models/userInEvent.model.js";

const createEvent = asyncHandler(async (req, res) => {
  const { title, dateAndTime, location, capacity } = req.body;

  if (
    [title, dateAndTime, location, capacity].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(404, "email, password is need for the login");
  }

  const newEvent = await eventModel.create({
    title: title,
    dateAndTime: dateAndTime,
    location: location,
    capacity: capacity,
  });

  if (!newEvent) {
    throw new ApiError(404, "somthing went worng, event is not created. ");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newEvent,
        "event is created successfully, you can be add the people in the event"
      )
    );
});

const showAllUpcomingEvent = asyncHandler(async (req, res) => {
  // Get current time to the browser
  const currentDate = new Date();

  // Fetch all upcoming events
  const upcomingEvents = await Event.findAll({
    where: {
      dateTime: { [Op.gt]: currentDate },
    },
    order: [
      ["dateTime", "ASC"], // sort by date first
      ["location", "ASC"], // then by location alphabetically
    ],
  });

  if (!upcomingEvents) {
    throw new ApiError(404, "upcomingEventsnot found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, upcomingEvents, "upcoming events get successfully")
    );
});

// get event details
const getEventDetails = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  if (eventId) {
    throw new ApiError(404, "Event Id is required ");
  }

  const event = await Event.findByPk({ eventId: id });

  if (!event) {
    throw new ApiError(404, "somthing went wrong, event details is not found");
  }

  const registedEventUser = await UserInEvent.findAll({ eventId: eventId });

  if (!registedEventUser) {
    throw new ApiError(404, "somthing went wrong, event's user is not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        event,
        registedEventUser,
        "event details get successfully"
      )
    );
});

const addUserInEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  const userIsExist = await UserInEvent.findOne({
    where: { eventId, userId },
  });

  if (userIsExist) {
    throw new ApiError(400, "user is allready exist");
  }

  const addUserInEvent = await UserInEvent.create({
    eventId: eventId,
    userId: userId,
  });

  if (!addUserInEvent) {
    throw new ApiError(400, "user can't be add in the event");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, addUserInEvent, "user be add in the event"));
});

const cancelRegistrationFromEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const eventDelete = await Event.destroy({
    where: { id: _Id },
  });

  const eventexist = await Event.findAll({ eventId: id });

  if (!eventexist) {
    throw new ApiError(400, "somthing went wrong event is not deleted");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "event delete was successfully"));
});

const eventStats = asyncHandler(async (req, res) => {});
