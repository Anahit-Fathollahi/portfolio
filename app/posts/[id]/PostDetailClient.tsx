"use client";

import { motion } from "framer-motion";
import { FileText, User2, Mail, Phone } from "lucide-react";
import { Post } from "@/types/post";
import { User } from "@/types/user";

interface Props {
  post: Post;
  user: User | null;
}

export default function PostDetailClient({ post, user }: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 flex justify-center">
      <motion.div
        className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-6 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            {post.title}
          </h1>
          <p className="text-gray-700 leading-relaxed">{post.body}</p>
        </div>

        <motion.div
          className="bg-blue-50 border border-blue-100 rounded-xl p-5 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <User2 className="w-5 h-5" />
            اطلاعات کاربر
          </h2>

          {user ? (
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <User2 className="w-4 h-4 text-blue-500" />
                <span>{user.name}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>{user.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>{user.phone}</span>
              </p>
            </div>
          ) : (
            <p className="text-gray-600">اطلاعات کاربر یافت نشد.</p>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}
