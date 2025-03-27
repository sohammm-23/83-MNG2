document.addEventListener('DOMContentLoaded', function() {
    // Create the concert environment
    createEnvironment();
    
    // Add stage elements
    createStage();
    
    // Add audience elements
    createAudience();
    
    // Setup UI
    setupUI();
    
    // Setup audio
    setupAudio();
    
    // Setup AI features
    setupAI();
});

function createEnvironment() {
    const scene = document.querySelector('a-scene');
    
    // Sky
    const sky = document.createElement('a-sky');
    sky.setAttribute('color', '#000000');
    sky.setAttribute('src', '#nightSkyTexture');
    scene.appendChild(sky);
    
    // Ground
    const ground = document.createElement('a-plane');
    ground.setAttribute('rotation', '-90 0 0');
    ground.setAttribute('width', '100');
    ground.setAttribute('height', '100');
    ground.setAttribute('color', '#222222');
    ground.setAttribute('shadow', 'receive: true');
    scene.appendChild(ground);
    
    // Lighting
    const ambientLight = document.createElement('a-entity');
    ambientLight.setAttribute('light', {
        type: 'ambient',
        color: '#555',
        intensity: 0.5
    });
    scene.appendChild(ambientLight);
    
    const stageLight = document.createElement('a-entity');
    stageLight.setAttribute('light', {
        type: 'spot',
        angle: 60,
        intensity: 1,
        color: '#ffffff',
        position: '0 15 0',
        target: '#stage'
    });
    scene.appendChild(stageLight);
}

function createStage() {
    const stage = document.querySelector('#stage');
    
    // Main stage platform
    const platform = document.createElement('a-box');
    platform.setAttribute('position', '0 0.1 -10');
    platform.setAttribute('width', '10');
    platform.setAttribute('height', '0.2');
    platform.setAttribute('depth', '5');
    platform.setAttribute('color', '#333333');
    platform.setAttribute('shadow', 'cast: true; receive: true');
    stage.appendChild(platform);
    
    // Backdrop
    const backdrop = document.createElement('a-plane');
    backdrop.setAttribute('position', '0 5 -12.5');
    backdrop.setAttribute('width', '15');
    backdrop.setAttribute('height', '10');
    backdrop.setAttribute('color', '#111122');
    backdrop.setAttribute('shadow', 'receive: true');
    stage.appendChild(backdrop);
    
    // Add performer (placeholder)
    const performer = document.createElement('a-entity');
    performer.setAttribute('gltf-model', '#performerModel');
    performer.setAttribute('position', '0 0 -10');
    performer.setAttribute('scale', '1.5 1.5 1.5');
    performer.setAttribute('animation-mixer', 'clip: *');
    stage.appendChild(performer);
}

function createAudience() {
    const audience = document.querySelector('#audience');
    
    // Audience area
    const audienceArea = document.createElement('a-plane');
    audienceArea.setAttribute('position', '0 0 5');
    audienceArea.setAttribute('rotation', '0 180 0');
    audienceArea.setAttribute('width', '20');
    audienceArea.setAttribute('height', '0.1');
    audienceArea.setAttribute('depth', '10');
    audienceArea.setAttribute('color', '#444444');
    audienceArea.setAttribute('shadow', 'receive: true');
    audience.appendChild(audienceArea);
    
    // Audience avatars (placeholder)
    for (let i = 0; i < 10; i++) {
        const avatar = document.createElement('a-entity');
        avatar.setAttribute('gltf-model', '#audienceModel');
        avatar.setAttribute('position', `${(i % 5) * 2 - 4} 0 ${Math.floor(i / 5) * 2 + 3}`);
        avatar.setAttribute('scale', '0.8 0.8 0.8');
        avatar.setAttribute('animation-mixer', 'clip: *');
        audience.appendChild(avatar);
    }
}

function setupUI() {
    const ui = document.querySelector('#ui');
    
    // Chat panel
    const chatPanel = document.createElement('a-entity');
    chatPanel.setAttribute('position', '0 2 -1');
    chatPanel.setAttribute('look-at', '[camera]');
    chatPanel.setAttribute('class', 'ui-element');
    
    const chatBackground = document.createElement('a-plane');
    chatBackground.setAttribute('width', '2');
    chatBackground.setAttribute('height', '1.5');
    chatBackground.setAttribute('color', 'rgba(0,0,0,0.7)');
    chatPanel.appendChild(chatBackground);
    
    const chatText = document.createElement('a-text');
    chatText.setAttribute('value', 'Chat:\nUser1: Hello!\nUser2: This is awesome!');
    chatText.setAttribute('align', 'left');
    chatText.setAttribute('width', '1.8');
    chatText.setAttribute('position', '-0.9 0.6 0.01');
    chatText.setAttribute('color', 'white');
    chatPanel.appendChild(chatText);
    
    ui.appendChild(chatPanel);
    
    // Reaction buttons
    const reactions = ['👏', '🎉', '❤️', '🔥'];
    reactions.forEach((reaction, i) => {
        const button = document.createElement('a-entity');
        button.setAttribute('position', `${i * 0.5 - 0.75} 1.5 -1`);
        button.setAttribute('look-at', '[camera]');
        button.setAttribute('class', 'ui-element reaction-button');
        button.setAttribute('data-reaction', reaction);
        
        const buttonBg = document.createElement('a-circle');
        buttonBg.setAttribute('radius', '0.2');
        buttonBg.setAttribute('color', 'rgba(0,0,0,0.7)');
        button.appendChild(buttonBg);
        
        const buttonText = document.createElement('a-text');
        buttonText.setAttribute('value', reaction);
        buttonText.setAttribute('align', 'center');
        buttonText.setAttribute('position', '0 0 0.01');
        buttonText.setAttribute('color', 'white');
        button.appendChild(buttonText);
        
        button.addEventListener('click', function() {
            sendReaction(reaction);
        });
        
        ui.appendChild(button);
    });
}

function setupAudio() {
    const audio = document.querySelector('#audio');
    
    // Background music
    const bgMusic = document.createElement('a-sound');
    bgMusic.setAttribute('src', '#musicTrack');
    bgMusic.setAttribute('autoplay', 'true');
    bgMusic.setAttribute('loop', 'true');
    bgMusic.setAttribute('positional', 'false');
    audio.appendChild(bgMusic);
    
    // Spatial audio for performer
    const performerAudio = document.createElement('a-sound');
    performerAudio.setAttribute('src', '#performerAudio');
    performerAudio.setAttribute('autoplay', 'true');
    performerAudio.setAttribute('position', '0 0 -10');
    audio.appendChild(performerAudio);
}

function setupAI() {
    // AI virtual host
    const host = document.createElement('a-entity');
    host.setAttribute('position', '2 0 -8');
    host.setAttribute('gltf-model', '#hostModel');
    host.setAttribute('id', 'aiHost');
    document.querySelector('a-scene').appendChild(host);
    
    // AI recommendations system
    setInterval(() => {
        // Simulate AI recommendations
        const recommendations = [
            "Check out the jazz performance next!",
            "You might enjoy the cultural dance show later.",
            "Try moving closer to the stage for a better view!"
        ];
        const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
        
        showAIMessage(randomRecommendation);
    }, 30000);
}

// Helper functions
function sendReaction(reaction) {
    // In a real app, this would send to a server
    console.log(`Sent reaction: ${reaction}`);
    
    // Show reaction in the scene
    const camera = document.querySelector('[camera]');
    const reactionEntity = document.createElement('a-text');
    reactionEntity.setAttribute('value', reaction);
    reactionEntity.setAttribute('position', '0 0 -2');
    reactionEntity.setAttribute('look-at', '[camera]');
    reactionEntity.setAttribute('animation', {
        property: 'position.y',
        to: '3',
        dur: '2000',
        easing: 'easeOutQuad'
    });
    reactionEntity.addEventListener('animationcomplete', () => {
        reactionEntity.parentNode.removeChild(reactionEntity);
    });
    camera.appendChild(reactionEntity);
}

function showAIMessage(message) {
    const messageEntity = document.createElement('a-entity');
    messageEntity.setAttribute('position', '0 2.5 -1');
    messageEntity.setAttribute('look-at', '[camera]');
    
    const bg = document.createElement('a-plane');
    bg.setAttribute('width', 'auto');
    bg.setAttribute('height', 'auto');
    bg.setAttribute('color', 'rgba(0,100,200,0.7)');
    messageEntity.appendChild(bg);
    
    const text = document.createElement('a-text');
    text.setAttribute('value', message);
    text.setAttribute('align', 'center');
    text.setAttribute('width', '2');
    text.setAttribute('position', '0 0 0.01');
    text.setAttribute('color', 'white');
    messageEntity.appendChild(text);
    
    document.querySelector('#ui').appendChild(messageEntity);
    
    // Remove after some time
    setTimeout(() => {
        messageEntity.parentNode.removeChild(messageEntity);
    }, 5000);
}