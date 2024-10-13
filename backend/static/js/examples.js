example_audio_template = document.getElementsByClassName('example_audio')[0]
example_audio_container = document.getElementsByClassName('example_audio_container')[0];

fetch('/audio_examples').then(function (response) {
    return response.json();
}).then(function (data) {
    logInfo(data);
    addAudioExamplesToContainer(data);
}).catch(function () {
    logInfo("Error");
});


function addAudioExamplesToContainer(audio_examples) {
    for (let i = 0; i < audio_examples.length; i++) {
        let example_audio_node = example_audio_template.cloneNode(true);
        let audioNode = example_audio_node.querySelector('audio');
        audioNode.src += audio_examples[i];
        example_audio_node.style = "";

        let titleNode = example_audio_node.getElementsByClassName('example_audio_title')[0];
        titleNode.innerHTML = audio_examples[i].split('.')[0];

        example_audio_container.appendChild(example_audio_node);
    }
}
