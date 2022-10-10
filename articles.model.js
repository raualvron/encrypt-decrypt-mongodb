module.exports = mongoose => {
    const schema = mongoose.Schema({
        message: String,
        iv: String
        },
        { timestamps: true }
    );

    const FIELDS = ['message', 'autor'];

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Articles = mongoose.model("articles", schema);
    return Articles;
};