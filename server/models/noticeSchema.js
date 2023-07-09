const mongoose = require("mongoose");


const noticeSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "title is required"],
		},
         pdfUrl:{
            type:String,
            required:[true, "thumbnail is required"],
        }
	},
	{ timestamps: true }
);

const notice = mongoose.model("notice", noticeSchema);

module.exports={
    notice,
}
