import {Component, ElementRef, ViewChild} from '@angular/core';
import {AgricultureService} from '../../shared/service/agriculture.service';
import {NgClass, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  imports: [
    NgForOf,
    FormsModule,
    NgClass
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  @ViewChild('chatMessages') chatMessages!: ElementRef; // Tham chiếu đến khung tin nhắn
  userMessage: string = ''; // Lưu tin nhắn người dùng nhập
  chatHistory: { role: string; content: string }[] = []; // Lịch sử hội thoại
  isLoading: boolean = false;

  constructor(private agricultureService: AgricultureService) {}

  // Gửi tin nhắn
  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Thêm tin nhắn người dùng vào lịch sử
    this.chatHistory.push({ role: 'User', content: this.userMessage });
    this.scrollToBottom(); // Cuộn xuống khi người dùng gửi tin nhắn

    // Gửi tin nhắn đến backend
    this.agricultureService.sendMessageToChatbot(this.userMessage).subscribe(
      (response) => {
        // Xử lý phản hồi từ backend
        console.log('Phản hồi từ backend:', response);

        // Lấy nội dung từ trường "response" và thêm vào lịch sử chat
        this.chatHistory.push({ role: 'AI', content: response.response });
        this.scrollToBottom(); // Cuộn xuống khi nhận được phản hồi
      },
      (error) => {
        // Xử lý lỗi
        this.chatHistory.push({ role: 'AI', content: 'Có lỗi xảy ra. Vui lòng thử lại.' });
        console.error('Error:', error);
        this.scrollToBottom(); // Cuộn xuống khi nhận được thông báo lỗi
      }
    );

    // Xóa ô nhập tin nhắn
    this.userMessage = '';
  }


  scrollToBottom() {
    try {
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

}
