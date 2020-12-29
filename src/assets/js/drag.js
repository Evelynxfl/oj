export function dragTwoColDiv(contentId,leftBoxId,resizeId,rightBoxId){
    let resize = document.getElementById(resizeId);
    let leftBox = document.getElementById(leftBoxId);
    let rightBox = document.getElementById(rightBoxId);
    let box = document.getElementById(contentId);
      resize.onmousedown = function (e) {
        let startX = e.clientX;
        resize.left = resize.offsetLeft;
        document.onmousemove = function (e) {
          let endX = e.clientX;
          let moveLen = resize.left + (endX - startX);
          let maxT = box.clientWidth - resize.offsetWidth;
          if (moveLen < 150) moveLen = 150;
          if (moveLen > maxT - 150) moveLen = maxT - 150;
          resize.style.left = moveLen;
          leftBox.style.width = moveLen + 'px';
          rightBox.style.width = (box.clientWidth - moveLen - 5) + 'px';
        }
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmouseup = null;
          resize.releaseCapture && resize.releaseCapture();
        }
        resize.setCapture && resize.setCapture();
        return false;
      }
  }