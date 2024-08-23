import React from 'react'
import toast from 'react-hot-toast';
import { Message } from '../../classes/Message';
import { User } from '../../classes/User';


interface iNotification {
    message: Message
    user: User
}

const Notification = ({message, user}: iNotification) => {
    return (
        <div
            className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5"
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={user.profilePic}
                            alt=""
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {user.fullName}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {message.message}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Notification