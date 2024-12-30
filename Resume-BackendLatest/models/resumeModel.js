const mongoose = require("mongoose");

const basicInfoSchema = new mongoose.Schema({
    id:  {
        type: String,
    },
    sectionTitle: {
        type: String,
    },
    detail : {
        name: {
            type: String,
            
        },
        title: {
            type: String,
           
        },
        linkedin: {
            type: String,
           
        },
        github: {
            type: String,
           
        },
        email: {
            type: String,
           
        },
        phone: {
            type: String,
           
        }
    }
   
});

const workExpSchema = new mongoose.Schema({

    id: {
        type: String,
    },
    sectionTitle: {
        type: String,
    },
    details: []
   
});

const projectchmea = new mongoose.Schema({

    id: {
        type: String,
    },
    sectionTitle: {
        type: String,
    },
    details: []
    
});

const educationSchema = new mongoose.Schema({

    id: {
        type: String,
    },
    sectionTitle: {
        type: String,
    },
    details: []
 
});

const achievementSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    sectionTitle:{
        type: String,
    },
    points: {
        type: [String],
    }
});

const summarySchema = new mongoose.Schema({
    
    id : {
        type: String,
    },
    sectionTitle :{
        type: String
    },
    summary :{
        type: String,
    },
    detail :{
        type: String,
    },
    summary: {
        type: String,
       
    }
});

const otherSchema = new mongoose.Schema({
 
    id : {
        type: String,
      
    },
    sectionTitle : {
        type: String,
    },
    other: {
        type: String,
        
    },
    detail : {
        type: String,
    }
});

const ResumeSchema = new mongoose.Schema(
    {
        basicInfo: [basicInfoSchema],
        workExp: [workExpSchema],
        project: [projectchmea],
        education: [educationSchema],
        achievement: [achievementSchema],
        summary: [summarySchema],
        other: [otherSchema],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
);

const Resume = mongoose.model("Resume", ResumeSchema);

module.exports = Resume;
