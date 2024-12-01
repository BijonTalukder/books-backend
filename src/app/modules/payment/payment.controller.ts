import { NextFunction, Request, Response } from "express";

// Handle payment success
const handlePaymentSuccess = async (req:Request, res:Response, next:NextFunction) => {
    const { transactionId } = req.query;


    try {
     
        res.redirect(`${dotenvHelper.frontend_url}/Product/success`);

    } catch (error) {
    }
};

// Handle payment fail
const handlePaymentFail = catchAsync(async (req, res, next) => {
    const { transactionId } = req.query;

    if (!transactionId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment data'));
    }

    console.log('Processing payment failure...');

    try {
        // Update the order's payment status to 'failed'
        const updatedRows = await orderModel.update(
            { paymentStatus: 'failed' },
            { where: { transactionID: transactionId } }
        );

        console.log('Rows updated:', updatedRows);

        if (updatedRows[0] === 0) {
            return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found'));
        }

        // Redirect to the fail page
        res.redirect(`${dotenvHelper.frontend_url}/Product/error?transactionId=${transactionId}`);
    } catch (error) {
        console.error('Error processing payment failure:', error);
        return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
    }
});

// Handle payment cancel
const handlePaymentCancel = catchAsync(async (req, res, next) => {
    const { transactionId } = req.query;

    if (!transactionId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment data'));
    }

    console.log('Processing payment cancellation...');

    try {
        // Update the order's payment status to 'cancelled'
        const updatedRows = await orderModel.update(
            { paymentStatus: 'cancelled' },
            { where: { transactionID: transactionId } }
        );

        console.log('Rows updated:', updatedRows);

        if (updatedRows[0] === 0) {
            return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found'));
        }

        // Redirect to the cancel page
        res.redirect(`${dotenvHelper.frontend_url}/Product/error?transactionId=${transactionId}`);
    } catch (error) {
        console.error('Error processing payment cancellation:', error);
        return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
    }
});

export const paymentController = {
    handlePaymentSuccess,
    handlePaymentFail,
    handlePaymentCancel
};
