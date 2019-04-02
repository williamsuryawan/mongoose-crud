const Member = require('../models/member.js');

class MemberController {
    static async create(req,res) {
        console.log("masuk method create member", req.body)
        try {
            let newMember = await Member.create(req.body)
            res.status(201).json(newMember);
        } catch (err) {
            console.log("Terjadi error", err.errors)
            if (err.errors.email) {
                res.status(409).json(err);
            } else if(err.errors.phone) {
                res.status(409).json(err);
            } else {
                res.status(500).json(err);
            }
        }
    }

    static async findAll(req,res) {
        let members = await Member.find({});
        res.status(200).json(members)
    }

    static async update(req,res) {
        console.log("masuk ke update member", req.params, req.body)
        try {
            let updatedMember = await Member.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
            res.status(200).json(updatedMember);
        } catch (err) {
            // console.log
            res.status(500).json(err.message)
        } 
    }

    static async delete(req,res) {
        console.log("masuk ke delete member", req.params)
        try {
            let foundMember = await Member.findOne({_id: req.params.id})
            let deletedMember = await Member.findOneAndDelete({_id:req.params.id})
            res.status(200).json(foundMember)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }
}

module.exports = MemberController