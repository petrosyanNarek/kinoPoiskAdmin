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
export const SeriaSchema = (
  videoSelect,
  trailerSelect,
  imgSelect,
  seriesId
) => {
  return yup.object().shape({
    name: yup.string().required("Name is a required !!!"),
    shortDescription: yup
      .string()
      .required("Short Description is a required !!!"),
    description: yup.string().required("Description is required"),
    rating: yup
      .number()
      .min(0, "Rating cannot be negative")
      .max(5, "Rating cannot have a value greater than 5")
      .required("Rating is required"),
    views: yup
      .number()
      .min(0, "Views cannot be negative")
      .required("Views is required"),
    cardImg:
      !seriesId || imgSelect
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
      !seriesId || trailerSelect
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
      !seriesId || videoSelect
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
    filmId: yup.number().min(1).required("Category is required"),
    part: yup.number().min(1).required("Part is required"),
  });
};
