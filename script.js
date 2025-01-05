// Counter Logic
let counter = 1;
const counterElement = document.getElementById("counter");
const incrementButton = document.getElementById("increment");
const resetButton = document.getElementById("reset");

// New buttons for options
const incrementRecordedButton = document.getElementById("increment-recorded");
const autoIncrementButton = document.getElementById("auto-increment");
const recordToggleButton = document.getElementById("record-toggle");
const recordingStatus = document.getElementById("recording-status");

let mediaRecorder;
let recordedChunks = [];

// Increment button (manual)
incrementButton.addEventListener("click", () => {
  counter++;
  if (counter <= 108) {
    counterElement.textContent = counter;
    playRecordedMantra();
  }
});

// Reset button
resetButton.addEventListener("click", () => {
  counter =1;
  counterElement.textContent = counter;
});

const bgMusic = document.getElementById("background-music");
const playButton = document.getElementById("play-button");

playButton.addEventListener("click", () => {
  bgMusic.volume = 0.2; // Set volume as desired
  bgMusic.loop = true; // Set audio to loop
  bgMusic.play()
    .then(() => {
      console.log("Audio is playing.");
    })
    .catch((error) => {
      console.log("Error playing audio:", error);
    });
});


// Affirmations Logic
const affirmations = [
    {
        hindi: "मैं अपने आप और ब्रह्मांड के साथ शांति में हूँ।",
        english: "I am at peace with myself and the universe."
    },
    {
        hindi: "मैं अपनी जिंदगी में आशीर्वाद के लिए आभारी हूँ।",
        english: "I am grateful for the blessings in my life."
    },
    {
        hindi: "मेरा मन शांत और केंद्रित है।",
        english: "My mind is calm and focused."
    },
    {
        hindi: "मैं प्रेम और सकारात्मकता का प्रचार करता हूँ।",
        english: "I radiate love and positivity."
    },
    {
        hindi: "मैं अपनी जिंदगी के दिव्य समय पर विश्वास करता हूँ।",
        english: "I trust the divine timing of my life."
    },
    {
        hindi: "मैं अपने उच्चतम उद्देश्य से मेल खाता हूँ।",
        english: "I am aligned with my highest purpose."
    },
    {
        hindi: "मैं खुशी और समृद्धि को अपनाता हूँ।",
        english: "I embrace joy and abundance."
    },
    {
        hindi: "मैं इस क्षण में जड़ित और उपस्थित हूँ।",
        english: "I am grounded and present in this moment."
    },
    {
        hindi: "मैं डर को छोड़ता हूँ और विश्वास को अपनाता हूँ।",
        english: "I release fear and embrace faith."
    },
    {
        hindi: "मैं दृढ़ हूँ और किसी भी चुनौती का सामना कर सकता हूँ।",
        english: "I am resilient and can overcome any challenge."
    },
    {
        hindi: "मैं अपनी जिंदगी की यात्रा पर विश्वास करता हूँ।",
        english: "I trust the journey of my life."
    },
    {
        hindi: "मैं प्यार और खुशी के योग्य हूँ।",
        english: "I am deserving of love and happiness."
    },
    {
        hindi: "मैं सफलता और समृद्धि के योग्य हूँ।",
        english: "I am worthy of success and prosperity."
    },
    {
        hindi: "मैं परिवर्तन को अपनाता हूँ और नए अवसरों का स्वागत करता हूँ।",
        english: "I embrace change and welcome new opportunities."
    },
    {
        hindi: "मेरे पास अपनी क्षमताओं में विश्वास है।",
        english: "I am confident in my abilities."
    },
    {
        hindi: "मैं हर दिन खुशी और सकारात्मकता का चुनाव करता हूँ।",
        english: "I choose happiness and positivity every day."
    },
    {
        hindi: "मैं सफलता और समृद्धि के लिए चुंबक हूँ।",
        english: "I am a magnet for success and abundance."
    },
    {
        hindi: "मैं शांति, संतुलन और शांति का प्रचार करता हूँ।",
        english: "I radiate calm, peace, and tranquility."
    },
    {
        hindi: "मैं अपनी जिंदगी के सभी पाठों के लिए आभारी हूँ।",
        english: "I am grateful for all the lessons in my life."
    },
    {
        hindi: "मैं अपने आप और अपनी अंतरदृष्टि पर विश्वास करता हूँ।",
        english: "I trust myself and my intuition."
    },
    {
        hindi: "मैं अपने सपनों को पूरा करने की क्षमता रखता हूँ।",
        english: "I am capable of achieving my dreams."
    },
    {
        hindi: "मैं अपने निर्णयों और क्रियाओं में आत्मविश्वास रखता हूँ।",
        english: "I am confident in my decisions and actions."
    },
    {
        hindi: "मैं अपने आप को माफ करता हूँ और पिछले गलतियों को छोड़ता हूँ।",
        english: "I forgive myself and release past mistakes."
    },
    {
        hindi: "मैं निरंतर बढ़ रहा हूँ और विकसित हो रहा हूँ।",
        english: "I am constantly growing and evolving."
    },
    {
        hindi: "मैं समृद्धि और खुशी से भरी जिंदगी जीने के योग्य हूँ।",
        english: "I deserve to live a life of abundance and joy."
    },
    {
        hindi: "मैं हर स्थिति में सकारात्मक पर ध्यान केंद्रित करने का चुनाव करता हूँ।",
        english: "I choose to focus on the positive in every situation."
    },
    {
        hindi: "मैं नए अनुभवों और अवसरों के लिए खुला हूँ।",
        english: "I am open to new experiences and opportunities."
    },
    {
        hindi: "मैं एक शक्तिशाली निर्माता हूँ, और मैं वह जीवन बनाता हूँ जो मैं चाहता हूँ।",
        english: "I am a powerful creator, and I create the life I want."
    },
    {
        hindi: "मैं विश्वास करता हूँ कि सब कुछ उसी तरह विकसित हो रहा है जैसा उसे होना चाहिए।",
        english: "I trust that everything is unfolding as it should."
    },
    {
        hindi: "मैं अच्छे चीजों के योग्य हूँ जो मेरे जीवन में आती हैं।",
        english: "I am worthy of all the good things that come into my life."
    },
    {
        hindi: "मैं अपनी पहचान से शांति में हूँ।",
        english: "I am at peace with who I am."
    },
    {
        hindi: "मैं जीवन की प्रक्रिया और इसके समय पर विश्वास करता हूँ।",
        english: "I trust in the process of life and its timing."
    },
    {
        hindi: "मैं अपनी भावनाओं और प्रतिक्रियाओं पर नियंत्रण रखता हूँ।",
        english: "I am in control of my emotions and reactions."
    },
    {
        hindi: "मैं प्रेम और समर्थन प्राप्त करने के लिए खुला हूँ।",
        english: "I am open to receiving love and support."
    },
    {
        hindi: "मैं जितनी सफलता प्राप्त करता हूँ, उसके योग्य हूँ।",
        english: "I am deserving of all the success I achieve."
    },
    {
        hindi: "मैं अपने जीवन में सभी सुंदरता के लिए आभारी हूँ।",
        english: "I am grateful for all the beauty in my life."
    },
    {
        hindi: "मैं चिंता और तनाव से मुक्त हूँ।",
        english: "I am free from worry and stress."
    },
    {
        hindi: "मैं आत्मविश्वासी और आत्म-नियंत्रित हूँ।",
        english: "I am confident and self-assured."
    },
    {
        hindi: "मैं एक अद्वितीय व्यक्तित्व हूँ, और मेरी क्षमता असीमित है।",
        english: "I am a unique individual with limitless potential."
    },
    {
        hindi: "मैं उस समृद्धि के लिए आभारी हूँ जो मेरे पास है और जो आ रही है।",
        english: "I am grateful for the abundance I have and the abundance on its way."
    },
    {
        hindi: "मैं सकारात्मक ऊर्जा का चुंबक हूँ।",
        english: "I am a magnet for positive energy."
    },
    {
        hindi: "मैं अपनी तक़दीर का निर्माता हूँ।",
        english: "I am a creator of my own destiny."
    },
    {
        hindi: "मैं सभी तारीफों के योग्य हूँ जो मुझे मिलती हैं।",
        english: "I am worthy of all the compliments I receive."
    },
    {
        hindi: "मैं सम्मान और दयालुता के योग्य हूँ।",
        english: "I am deserving of respect and kindness."
    },
    {
        hindi: "मैं निरंतर वृद्धि और सफलता के अवसरों को आकर्षित करता हूँ।",
        english: "I am constantly attracting opportunities for growth and success."
    },
    {
        hindi: "मैं मजबूत, लचीला, और किसी भी चुनौती का सामना करने में सक्षम हूँ।",
        english: "I am strong, resilient, and capable of handling anything."
    },
    {
        hindi: "मैं अपने सपनों और लक्ष्यों को पूरा करने के योग्य हूँ।",
        english: "I am worthy of achieving my dreams and goals."
    }
];

  
const affirmationElement = document.getElementById("affirmation");

setInterval(() => {
  const randomIndex = Math.floor(Math.random() * affirmations.length);
  const randomAffirmation = affirmations[randomIndex];

  // Display both Hindi and English versions
  affirmationElement.innerHTML = `
    <p><strong> ${randomAffirmation.hindi}</p>
    <p><strong> ${randomAffirmation.english}</p>
  `;
}, 15000);


// Recording Logic
recordToggleButton.addEventListener("click", async () => {
  if (recordToggleButton.textContent === "Record Mantra") {
    // Start recording
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => recordedChunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "audio/webm" });
      localStorage.setItem("recordedMantra", URL.createObjectURL(blob));
      recordedChunks = [];
      recordToggleButton.textContent = "Recording recorded";
      incrementRecordedButton.disabled = false; // Enable manual increment
      autoIncrementButton.disabled = false; // Enable auto increment
    };
    mediaRecorder.start();
    recordingStatus.textContent = "Recording...";
    recordToggleButton.textContent = "Stop Recording";
  } else {
    // Stop recording
    mediaRecorder.stop();
    // Function to show the pop-up with the recording status message
function showPopup() {
    const recordingStatus = document.getElementById("recordingStatus");
  
    // Creating the formatted message with HTML tags for better structure
    recordingStatus.innerHTML = `
    <strong>Now that your mantra is recorded, you can choose one of the following options:</strong><br><br>
    <ul>
      <li><strong>1. Auto Increment:</strong> The counter will automatically increase until it reaches 108.</li>
      <li><strong>2. Increment by Mantra:</strong> You will need to click the button each time to increment the counter until it reaches 108.</li>
    </ul><br>
    <strong>अब आपका मंत्रा रिकॉर्ड हो चुका है, आप निम्नलिखित में से कोई एक विकल्प चुन सकते हैं:</strong><br><br>
    <ul>
      <li><strong>1. ऑटो इन्क्रीमेंट:</strong> काउंटर  अपने आप बढ़ेगा जब तक यह 108 तक नहीं पहुँच जाता।</li>
      <li><strong>2. मंत्रा द्वारा इन्क्रीमेंट:</strong> आपको हर बार बटन पर क्लिक करना होगा जिससे काउंटर 108 तक बढ़ेगा।</li>
    </ul>

  `;
  
  
    // Show the popup
    document.getElementById("popup").style.display = "flex";
  }
  
  // Close the popup when the close button is clicked
  document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
  });
  
  // Call this function after recording is saved
  recordingStatus.textContent = "Recording saved. You may choose.";
  showPopup();
  
    
  }
});

// Play the recorded mantra
function playRecordedMantra() {
  const recordedMantraURL = localStorage.getItem("recordedMantra");
  if (recordedMantraURL) {
    const audio = new Audio(recordedMantraURL);
    audio.play();
  }
}

// Manual increment with recorded mantra
incrementRecordedButton.addEventListener("click", () => {
  counter++;
  if (counter <= 108) {
    counterElement.textContent = counter;
    playRecordedMantra();
  }
});

// Auto increment up to 108
autoIncrementButton.addEventListener("click", () => {
    let autoCounter = counter; // Start from the current counter value
    const mantraURL = localStorage.getItem("recordedMantra"); // Get recorded mantra URL
  
    if (!mantraURL) {
      alert("Please record a mantra first!");
      return;
    }
  
    // Function to play the recorded mantra and increment the counter after it finishes
    function playMantraAndIncrement() {
      const audio = new Audio(mantraURL);
  
      // Event listener to increment the counter after the mantra finishes
      audio.addEventListener("ended", () => {
        if (autoCounter < 108) {
          autoCounter++; // Increment the counter
          counterElement.textContent = autoCounter; // Update the displayed counter
          playMantraAndIncrement(); // Play the mantra again
        }
      });
  
      audio.play().catch((error) => {
        console.error("Error playing mantra:", error);
      });
    }
  
    playMantraAndIncrement(); // Start the first mantra play
  });
  
// Clear Local Storage on Session End
window.addEventListener("beforeunload", () => {
  localStorage.removeItem("recordedMantra");
});
