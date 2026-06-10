import './globals.css';

export const metadata = {
  title: 'AI 聊天助手',
  description: '基于Next.js的智能对话应用',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}