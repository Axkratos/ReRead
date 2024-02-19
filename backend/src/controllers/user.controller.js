import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/AsyncHandler.js'
import { User } from '../models/user.model.js'
// import cookieParser from 'cookie-parser'
import { app } from '../app.js'

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body
    console.log(req.body)

    if (password !== confirmPassword) {
      
      return res.status(400).json({ error: 'Passwords do not match' })
      
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    })
    console.log(user)
    // Save the user to the database
    await user.save()

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
    )

    res.cookie('token', token, {
      httpOnly: true, // The cookie is not accessible via JavaScript
      // Add more options if needed (e.g., secure, sameSite)
    })

    // Send the response after saving the user
    res
      .status(201)
      .json({ user, token, message: 'User registered successfully' })
  } catch (error) {
    // Handle errors
    console.error(error)
    res.status(500).json({ error: 'Internal Server sign up Error' })
  }
}

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
      throw new ApiError(404, 'User not found')
    }
    console.log(
      'Here is detail : ',
      email,
      password,
      process.env.ACCESS_TOKEN_SECRET,
    )
    const matchPassword = await bcrypt.compare(password, existingUser.password)

    if (!matchPassword) {
      throw new ApiError(400, 'Invalid Password')
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.ACCESS_TOKEN_SECRET,
    )
    res
      .status(201)
      .cookie('accessToken', token, options)
      .json({ user: existingUser, token: token })
  } catch (error) {
    throw new ApiError(500, 'Something went wrong', error.message)
  }
})

// export { signup, signin }
