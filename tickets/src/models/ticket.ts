import mongoose, { mongo } from 'mongoose';

//  An interface that describe the properties
//  that are require to create a new Ticket
// Input from FrontEnd
interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

// An interface that describes the properties
// that Ticket Document has
// ALl the properties a Acutal Doc of a Ticket can have in Mongodb like some extra may be
interface TicketDoc extends mongoose.Document {
    title: number;
    price: number;
    userId: string;
}

// An interface that describes the properties
// that a Ticket Model has
// we creating a build method which internally call create new Ticket to create a ticket we defining what it will take as input and what it will output
interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        userId: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
