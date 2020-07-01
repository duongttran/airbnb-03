const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "tag must have a name"],
        unique: true
    }
})

// tagSchema.statics.generateTags = async function (tags) {
//     const ltags = tags.map(e => e.toLowerCase().trim()); 
//     const tagIDs = ltags.map(async e => {
//         let tag = await this.findOne({ tag: e });
       
//         if (tag)
//             return tag
        
//         tag = await this.create({ tag: e })
//         return tag
//     })
//     const result = Promise.all(tagIDs) 
//     return result
// }

const Tag = mongoose.model("Tag", tagSchema)
module.exports = Tag;