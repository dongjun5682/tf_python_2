$(document).ready(() => {
    let mainOutput = $('#output');
    let subOutput = $('#output2');
    let op = $('#operator');
    let num1 = $('#num1');
    let num2 = $('#num2');
    let temp = $('#temp');
    let clearDate = () => {
        num1.val('')
        op.val('')
        num2.val('')
        temp.val('')
    };
    let clearOutput = () => {
        mainOutput.html('');
        subOutput.html('');
    };
    let digitError = () => {
        mainOutput.html(0);
        subOutput.html('Reach Digit Limit');
        temp.val(0);
    };
    $('.btn-default').click(function () {

        if (('+-*!/').indexOf(mainOutput.html()) != -1) {
            mainOutput.html('')
        }
        if ($(this).val() == '.' && (mainOutput.html().indexOf('.') != -1))
            return;
        if (mainOutput.html() == '0' || subOutput.html() == 'Reach Digit Limit') {
            clearOutput();
        }
        if (temp.val() !== '') {
            clearOutput()
            clearDate()
        }

        mainOutput.append($(this).val());
        subOutput.append($(this).val());
        if (mainOutput.html().length > 12) {
            digitError()
        }
    });
    $('#clearButton').click(() => {
        mainOutput.html('0');
        subOutput.html('');
        clearDate();
    })
    $('.btn-operate').click(()=>{
        clearDate()
        mainOutput.html('');
    })


    $('#resultButton').click(() => {
        $.getJSON($SCRIPT_ROOT + '/calc',{stmt:$('#output2').text()}, d => {
            mainOutput.html(d.result);
            subOutput.html('');
            clearDate();
        })

        /*$('.btn-operate').click(function(){
            let newOperator = $(this).val();
              if(num1.val() !== '' && ('+-*!/').indexOf(num1.val()) == -1
                && op.val() !== ''){
                num2.val(mainOutput.html());
                if(('+-*!/').indexOf(num2.val()) != -1)return;
                let x = {};
                $.getJSON($SCRIPT_ROOT+'/calc',x,d=>{
                    if(d.result.toString().length > 13){
                        digitError();
                    }else{
                        //계산 결과
                    }
                });
            }*/
        })
    });