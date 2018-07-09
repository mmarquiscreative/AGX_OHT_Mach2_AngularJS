<div class="stage-volume" ng-controller="volumeController as volume">
  <div class="volume-body">
    <p class="lead-text">Adjust the volume on your computer so the noise plays at a comfortable level. This will establish a baseline volume for the rest of the quiz.</p>
    <p class="lead-text">Please do not adjust your computer volume after this step.</p>
  </div>

  <audio id="volumeAudio" src="/wp-content/plugins/agx-hearing-test/sounds/noise.mp3" loop autoplay></audio>

  <button ng-click="volume.stopNoise()" ui-sref="stage.toneTest" class="btn-submit">Next Step <span class="glyphicon glyphicon-circle-arrow-right"></span></button>
</div>