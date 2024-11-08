import { User, Dish, Reserve } from "../models/users.mjs";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

export default class UserController {
    static async create(req, res) {
        try {
            const { username, email, password } = req.body;
            const hashed = await bcrypt.hash(password, 5);
            const user = new User({
                email,
                username,
                password: hashed
            });
            await user.save();
            return res.status(201).json({ msg: 'Создан' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const finded = await User.findOne({ email: email });
            if (!finded) {
                return res.status(404).json({ msg: 'Не найден' });
            }
            const findedByPassword = await bcrypt.compare(password, finded.password);
            if (!findedByPassword) {
                return res.status(404).json({ msg: 'Не найден' });
            }
            const payload = {
                _id: finded._id,
                username: finded.username
            };
            const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '10h' });
            return res.status(200).json({ ...finded._doc, token });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async dishes(req, res) {
        try {
            const { name, price, category } = req.body;
            const dish = new Dish({
                name,
                price,
                category
            });
            await dish.save();
            
            return res.status(201).json({ msg: 'Блюдо добавлено' });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async getDishes(req, res) {
        try {
            const dishes = await Dish.find();
            return res.status(200).json(dishes);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async getUser(req, res) {
        try {
            const { username } = req.params;
            const user = await User.findOne(username);
            if (!user) {
                return res.status(404).json({ msg: 'Пользователь не найден' });
            }
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

static async Reserve(req, res) {
    try {
        const { name, date, table, number, commentary } = req.body;
        const reserve = new Reserve({
            name,
            date,
            number,
            table,
            commentary
        });
        await reserve.save();
        
        return res.status(201).json({ msg: 'Столик забронирован' });
    } catch (error) {
        return res.status(500).json({ error });
    }
}
static async getReserve(req, res) {
    try {
        const reserve = await Reserve.find();
        return res.status(200).json(reserve);
    } catch (error) {
        return res.status(500).json({ error });
    }
}
}