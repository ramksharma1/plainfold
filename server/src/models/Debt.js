import mongoose from 'mongoose'

const debtSchema = new mongoose.Schema(
  {
    creditor: {
      type: String,
      required: [true, 'Creditor name is required'],
      trim: true,
      maxlength: 200,
    },
    balance: {
      type: Number,
      required: [true, 'Balance is required'],
      min: [0, 'Balance cannot be negative'],
    },
    apr: {
      type: Number,
      default: 0,
      min: [0, 'APR cannot be negative'],
      max: [100, 'APR cannot exceed 100%'],
    },
    minPayment: {
      type: Number,
      default: 0,
      min: [0, 'Minimum payment cannot be negative'],
    },
    status: {
      type: String,
      enum: {
        values: ['current', 'late_30', 'late_60', 'charge_off', 'in_collection'],
        message: '{VALUE} is not a valid status',
      },
      default: 'current',
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt
  }
)

const Debt = mongoose.model('Debt', debtSchema)

export default Debt