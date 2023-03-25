import * as yup from "yup";
const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
  video: ["mp4"],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
}
export const FilmSchema = (videoSelect, trailerSelect, imgSelect, filmId) => {
  return yup.object().shape({
    name: yup
      .string("Not valid type of name")
      .required("Name is a required !!!"),
    shortDescription: yup
      .string("Not valid type of short description")
      .required("Short Description is a required !!!"),
    description: yup.string().required("Description is required"),
    createdYear: yup
      .number()
      .required("Created Year is required")
      .typeError("Is not valid type")
      .min(
        1890,
        "The date of the film cannot be less than 1890, because the first film was shot in that year."
      )
      .max(
        new Date().getFullYear(),
        "The movie date couldn't be bigger than this year"
      ),
    rating: yup
      .number("Not valid type of rating")
      .min(0, "Rating cannot be negative")
      .max(5, "Rating cannot have a value greater than 5")
      .required("Rating is required"),
    views: yup
      .number("Not valid type of views")
      .min(0, "Views cannot be negative")
      .required("Views is required"),
    categoryId: yup.number().required("Category is required"),
    genres: yup
      .array()
      .min(1, "Genres must be 1 or more characters")
      .required("Genres is requires"),
    countries: yup
      .array()
      .min(1, "Countries must be 1 or more characters")
      .required("Countries is requires"),
    actors: yup
      .array()
      .min(1, "Actors must be 1 or more characters")
      .required("Actors is requires"),
    authors: yup
      .array()
      .min(1, "Authors must be 1 or more characters")
      .required("Authors is requires"),
    cardImg:
      !filmId || imgSelect
        ? yup
            .mixed()
            .required("Required")
            .test("is-valid-type", "Not a valid image type", (value) =>
              isValidFileType(
                value && value.name && value.name.toLowerCase(),
                "image"
              )
            )
        : "",
    trailer:
      !filmId || trailerSelect
        ? yup
            .mixed()
            .required("Required")
            .test("is-valid-type", "Not a valid vidio type", (value) =>
              isValidFileType(
                value && value.name && value.name.toLowerCase(),
                "video"
              )
            )
        : "",
    video:
      !filmId || videoSelect
        ? yup
            .mixed()
            .required("Required")
            .test("is-valid-type", "Not a valid vidio type", (value) =>
              isValidFileType(
                value && value.name && value.name.toLowerCase(),
                "video"
              )
            )
        : "",
  });
};
