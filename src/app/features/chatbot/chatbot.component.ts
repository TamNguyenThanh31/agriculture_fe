import { Component } from '@angular/core';
import {AgricultureService} from '../../shared/service/agriculture.service';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  userMessage: string = ''; // Lưu tin nhắn người dùng nhập
  chatHistory: { role: string; content: string }[] = []; // Lịch sử hội thoại

  constructor(private agricultureService: AgricultureService) {}

  // Gửi tin nhắn
  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Thêm tin nhắn người dùng vào lịch sử
    this.chatHistory.push({ role: 'User', content: this.userMessage });

    // Gọi API backend
    this.agricultureService.sendMessageToChatbot(this.userMessage).subscribe(
      (response) => {
        // Thêm phản hồi từ chatbot vào lịch sử
        this.chatHistory.push({ role: 'AI', content: response });
      },
      (error) => {
        // Xử lý lỗi nếu cần
        console.error('Error:', error);
        this.chatHistory.push({
          role: 'AI',
          content: 'Có lỗi xảy ra, vui lòng thử lại sau.',
        });
      }
    );

    // Xóa tin nhắn người dùng sau khi gửi
    this.userMessage = '';
  }
}
