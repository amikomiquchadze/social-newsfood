import like from "../assets/Like.png";
import love from "../assets/Heart.png";
import laugh from "../assets/Grinning-Face--Streamline-Noto-Emoji.png";
import wow from "../assets/Face-With-Open-Mouth--Streamline-Noto-Emoji.png";
import sad from "../assets/Crying-Face--Streamline-Noto-Emoji.png";
import angry from "../assets/Angry-Face--Streamline-Noto-Emoji.png";

export type ReactionType = "LIKE" | "LOVE" | "LAUGH" | "WOW" | "SAD" | "ANGRY";
export interface ReactionOptions {
  type: ReactionType;
  emoji: string;
  label: string;
}
export const reactionEmojiSource:ReactionOptions[] = [
  { type: "LIKE", emoji: like, label: "Like" },
  { type: "LOVE", emoji: love, label: "Love" },
  { type: "LAUGH", emoji: laugh, label: "Haha" },
  { type: "WOW", emoji: wow, label: "Wow" },
  { type: "SAD", emoji: sad, label: "Sad" },
  { type: "ANGRY", emoji: angry, label: "Angry" },
];
