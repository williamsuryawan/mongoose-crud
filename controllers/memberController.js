const Member = require('../models/member.js');

class MemberController {
    static async create(req,res) {
        try {
            let newMember = await Member.create(req.body)
            res.status(201).json(newMember);
        } catch (err) {
            console.log("Terjadi error", err.errors)
            if (err.erros.email) {
                res.status(409).json(err);
            } else if(err.error.password) {
                res.status(409).json(err);
            } else {
                res.status(500).json(err);
            }
        }
    }

    static async findAll(req,res) {
        let members = await Member.findAll({});
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

    static async delete(res,res) {
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