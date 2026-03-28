import { View, Text, Modal, TouchableOpacity, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Avatar } from '@/components/ui/Avatar';
import { Comment } from '@/types';
import { useState } from 'react';

interface CommentSheetProps {
  visible: boolean;
  comments: Comment[];
  onClose: () => void;
  onAddComment?: (text: string) => void;
  canComment: boolean;
}

const avatarColors = ['#E8A0BF', '#D4A574', '#7ECEC1', '#C77DA3', '#5B8C5A'];

export function CommentSheet({ visible, comments, onClose, onAddComment, canComment }: CommentSheetProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Comments</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={styles.empty}>No comments yet. Be the first!</Text>
            }
            renderItem={({ item }) => {
              const colorIndex = item.userName.charCodeAt(0) % avatarColors.length;
              return (
                <View style={styles.comment}>
                  <Avatar name={item.userName} size={32} color={avatarColors[colorIndex]} />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUser}>{item.userName}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                </View>
              );
            }}
          />

          {canComment ? (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <View style={styles.inputRow}>
                <TextInput
                  value={newComment}
                  onChangeText={setNewComment}
                  placeholder="Add a comment..."
                  placeholderTextColor={Colors.textLight}
                  style={styles.input}
                />
                <TouchableOpacity onPress={handleSubmit} disabled={!newComment.trim()}>
                  <Ionicons
                    name="send"
                    size={22}
                    color={newComment.trim() ? Colors.rose : Colors.textLight}
                  />
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          ) : (
            <View style={styles.loginPrompt}>
              <Text style={styles.loginText}>Sign in to comment</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    minHeight: 300,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  list: {
    padding: 16,
    gap: 16,
  },
  empty: {
    textAlign: 'center',
    color: Colors.textSecondary,
    fontSize: 14,
    paddingVertical: 40,
  },
  comment: {
    flexDirection: 'row',
    gap: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  commentText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginTop: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    backgroundColor: Colors.surfaceDim,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  loginPrompt: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  loginText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
