
export default async (req, res, next) => {
    try {
        if (req.session) {
            return next()
        }
        const err = new Error('You dont have the permission to do that !')
        err.status = 401
        return next(err)
    } catch (err) {
        next(err)
    }
}