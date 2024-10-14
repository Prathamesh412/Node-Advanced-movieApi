const rolePermission = {
    guest:['read'],
    moderator:['read','create', 'update'],
    admin : ['read','create','update', 'delete']
}

export const checkPermission= (requiredPermission) =>
    (req,res,next) => {
        const userRole = req.body.role ?? '';

        if (rolePermission[userRole.toLowerCase().includes(requiredPermission.toLowerCase())]) return next()
        
        return res.status(403).json({message:"Forbidden. Role doesn't have permission" })
    }
