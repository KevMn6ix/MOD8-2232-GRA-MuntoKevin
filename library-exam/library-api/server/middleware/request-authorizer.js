// Request authorizer route-level middleware
export function createAuthorizer(role) {
    return async (req, res, next) => {
        try {
            const user = req.session.user
            if (user.role === 'librarian') {
                return next() // Pass request to next request handler or middleware
            } else {
                next(createAuthorizationError()) // Pass error with status 403 Forbidden (actually means unauthorized) to next error handler middleware
            }
        } catch (err) {
            next(err)
        }
    }
}

export function createAuthorizationError() {
    const err = new Error('Request unauthorized because you are not able to do this !')
    err.status = 403 // Set status to 403 Forbidden (actually means unauthorized)
    return err
}

export default createAuthorizer