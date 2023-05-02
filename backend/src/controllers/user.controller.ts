import asyncHandler from 'express-async-handler';

// export const getUsers = asyncHandler(async (req, res) => {
//   try {
//     const usersExists = await User.find({_id: {$in:req.body.users}})

//     if (usersExists.length > 0 && usersExists.length === req.body.users.length) {
//       res.status(200).json(usersExists)
//     } else {
//       res.status(401).json({message: 'one or more users are not found'})
//     }
//   } catch (error) {
//     res.status(500).json({message: 'internal server error', error: error})
//   }
// });
