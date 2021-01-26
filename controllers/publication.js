
const publication = require("../models/publication");
//post a publication

exports.Postpublication = async (req, res) => {
      try {
            const newPublication = new publication({ ...req.body });
            // if(!req.body.email){
            //     res.status(400).send({message:"email is required check again"});
            //   return ;
            //}
            const response = await newPublication.save();
            res.send({ response: response, message: "pub is saved" });
      } catch (error) {
            res.status(404).send({ message: "can not save it" }, error);
            //express validater
            //bech nsalahha

      }
};

//GET all publication
exports.GetAllPublication = async (req, res) => {
      try {
            const result = await publication.find()
                  .populate("comments")
                  .populate({
                        path: 'comments',
                        populate: {
                              path: 'user',
                              model: 'user'
                        }
                  })
            res.send({ response: result, message: "getting publications successfully" });
      } catch (error) {
            res.status(400).send({ message: "can not get pulications" });
      }
};

//GET one publication
exports.GetOnePublication = async (req, res) => {
      try {
            const result = await publication.findOne({ _id: req.params.id })
            res.send({ response: result, message: "getting publication successfully" });
      } catch (error) {
            res.status(400).send({ message: "there is no publication with this id" });
      }
};

//delete one publication by id
exports.DeleteOnePublication = async (req, res) => {

      try {
            const result = await publication.deleteOne({ _id: req.params.id })
            result.n
                  ? res.send({ message: "publication deleted" })
                  : res.send({ message: "there is no publication with this id" });

      } catch (error) {
            res.status(400).send({ message: "there is no publication with this id" });
      }
};

//update a publication by id
exports.UpdatePublication = async (req, res) => {
      try {
            const result = await publication.updateOne(
                  { _id: req.params.id },
                  { $set: { ...req.body } })
            result.nModified ?
                  res.send({ message: "publication updated", user: req.body }) :
                  res.send({ message: "publication already updated", user: req.body })
      } catch (error) {
            res.status(400).send({ message: "there is not publication with this id" });
      }
};

