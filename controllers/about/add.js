import { About } from "../../models/aboutModel.js";
import { uploadImg } from "../../utilities/imageHandler.js";
import { SUCCESS, FAIL } from "../../utilities/successWords.js";

export const add = async (req, res) => {
  const image = await uploadImg(req.file);
  const about = new About({ ...req.body, image: image.ImgUrl });
  await about.save();
  res.status(201).json({
    success: SUCCESS,
    status: 201,
    message: "About entry created successfully",
    data: about,
  });
};
