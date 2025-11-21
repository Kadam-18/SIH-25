import React from 'react';

const sessions = [
  {
    title: "Vamana (Therapeutic Emesis)",
    questions: [
      { label: "How comfortable did you feel during the Vamana therapy?", type: "scale" },
      { label: "Did the therapist explain the procedure clearly before starting?", type: "yesno" },
      { label: "Did you experience any relief or improvement post-therapy?", type: "yesno" },
      { label: "How satisfied are you with the hygiene and cleanliness of the therapy area?", type: "scale" },
      { label: "Any discomfort or suggestions regarding this therapy?", type: "text" },
    ]
  },
  {
    title: "Virechana (Purgation Therapy)",
    questions: [
      { label: "Were the pre-procedure instructions easy to follow?", type: "yesno" },
      { label: "How would you rate your overall experience during Virechana?", type: "scale" },
      { label: "Did you face any discomfort or uneasiness after the therapy?", type: "yesno" },
      { label: "Was the therapist attentive and supportive throughout the procedure?", type: "scale" },
      { label: "Any additional comments or suggestions for improvement?", type: "text" },
    ]
  },
  {
    title: "Basti (Medicated Enema)",
    questions: [
      { label: "Was the environment comfortable and private during Basti therapy?", type: "scale" },
      { label: "Did the procedure provide expected relief or improvement?", type: "yesno" },
      { label: "How professional and caring was the therapist during the therapy?", type: "scale" },
      { label: "Were the post-therapy care instructions clear and easy to follow?", type: "yesno" },
      { label: "Any suggestions for making your experience better?", type: "text" },
    ]
  },
  {
    title: "Nasya (Nasal Therapy)",
    questions: [
      { label: "Did you feel relaxed and comfortable during the Nasya procedure?", type: "scale" },
      { label: "Was the process explained clearly by the therapist?", type: "yesno" },
      { label: "Did you notice improvement in your symptoms post-therapy?", type: "yesno" },
      { label: "Rate the hygiene and atmosphere of the treatment area.", type: "scale" },
      { label: "Any remarks or suggestions about this session?", type: "text" },
    ]
  },
  {
    title: "Raktamokshana (Bloodletting Therapy)",
    questions: [
      { label: "How would you rate your confidence in the safety of this procedure?", type: "scale" },
      { label: "Did you feel minimal discomfort during the process?", type: "yesno" },
      { label: "Was the therapist professional and well-prepared?", type: "scale" },
      { label: "Did you experience positive results after therapy?", type: "yesno" },
      { label: "Please share your feedback or suggestions for improvement.", type: "text" },
    ]
  }
];

function renderQuestion(q, idx) {
  switch (q.type) {
    case "text":
      return (
        <div key={idx} style={{ marginBottom: "1.5rem" }}>
          <label>{q.label}</label>
          <textarea rows="2" style={{ width: "100%" }} />
        </div>
      );
    case "scale":
      return (
        <div key={idx} style={{ marginBottom: "1.5rem" }}>
          <label>{q.label} </label>
          {[1, 2, 3, 4, 5].map(val => (
            <label key={val} style={{ margin: "0 8px" }}>
              <input type="radio" name={q.label} value={val} /> {val}
            </label>
          ))}
        </div>
      );
    case "yesno":
      return (
        <div key={idx} style={{ marginBottom: "1.5rem" }}>
          <label>{q.label} </label>
          <label style={{ margin: "0 8px" }}>
            <input type="radio" name={q.label} value="yes" /> Yes
          </label>
          <label style={{ margin: "0 8px" }}>
            <input type="radio" name={q.label} value="no" /> No
          </label>
        </div>
      );
    default:
      return null;
  }
}

export default function FeedbackPage() {
  return (
    <div style={{
      maxWidth: 600,
      margin: "0 auto",
      padding: "2rem",
      background: "#f9f9f9",
      borderRadius: "12px",
      boxShadow: "0 2px 10px #ddd",
      overflowY: 'auto',
      minHeight: "80vh"
    }}>
      <h1>Panchakarma Therapy Feedback</h1>
      {sessions.map((session, i) => (
        <div key={i} style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#1a202c" }}>{session.title}</h2>
          {session.questions.map(renderQuestion)}
        </div>
      ))}
      <button style={{
        padding: "12px 32px",
        background: "#3881c5",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontSize: "1.1rem",
        marginTop: "1.5rem",
        cursor: "pointer"
      }}>
        Submit Feedback
      </button>
    </div>
  );
}