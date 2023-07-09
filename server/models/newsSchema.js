const mongoose = require("mongoose");


const newsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "title is required"],
		},
        description:{
            type:String,
            required:[true, "description is required"],
        },
        thumbnailUrl:{
            type:String,
            required:[true, "thumbnail is required"],
        },
        markdownFileUrl:{
            type: String,
            
        },
         newsFolderPath:{
            type: String,
            required:[true, "Markdown file is required"]
        },
        imagesPath:[{
            type:String,
           
        }],
        type: {
			type: [String],
			enum: ["GENERAL", "CSE", "MECHANICAL", "CIVIL","ELECTRICAL","INSTRUMENTATION"],
			default: ["GENERAL"],
		},
	},
	{ timestamps: true }
);

const news = mongoose.model("news", newsSchema);

module.exports={
    news,
}
