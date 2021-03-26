function optiona(filePath,outputPath)
%UNTITLED3 Summary of this function goes here
%   Detailed explanation goes here
%fileName = 'sa1.wav';  读入文件
[inpSigWav,Fs] = audioread(filePath);
%sound(inpSigWav,Fs);


%  Define the FIR filter coefficients
firCoef = [-0.1,0.3,0.5,0.5,0.5,0.3,-0.1];
z = fft(firCoef,8000);

%  Plotting of the amplitude of the filter   %画出幅频特性
subplot(211);
plot(abs(z));title('Figure of the magnitude frequency characteristic of the flter');xlabel('Hz');
subplot(212);
plot(10*log(abs(z)));xlabel('Hz');ylabel('DB');
%nCoef = length(firCoef);



%  take account of the filter length  时域相乘   可以改成卷积即频域上的
inpSigWav1 = [inpSigWav;zeros(6,1)];
inpSigWav2 = [0;inpSigWav;zeros(5,1)];
inpSigWav3 = [zeros(2,1);inpSigWav;zeros(4,1)];
inpSigWav4 = [zeros(3,1);inpSigWav;zeros(3,1)];
inpSigWav5 = [zeros(4,1);inpSigWav;zeros(2,1)];
inpSigWav6 = [zeros(5,1);inpSigWav;0];
inpSigWav7 = [zeros(6,1);inpSigWav];


%  Allocate memory for the output signal  %滤波之后的数据 
outSigWav = firCoef(1)*inpSigWav1+firCoef(2)*inpSigWav2+firCoef(3)*inpSigWav3+firCoef(4)*inpSigWav4+firCoef(5)*inpSigWav5+firCoef(6)*inpSigWav6+firCoef(7)*inpSigWav7;
outSigWav = outSigWav./(max(abs(outSigWav)));

%  Plotting of the input and output signals % 画出滤波之后的输入和输出信号图对比
%subplot(413);
%plot(inpSigWav7,'g'); 
%hold on
%plot(outSigWav,'b');

%part of the input and output signals  %画出滤波之后的某段输入和输出信号图对比
%subplot(414);
%plot([1001:1200],inpSigWav(1001:1200),'g',[1001:1200],outSigWav(1001:1200),'b'); 


%  Store the output signal into .wav file
audiowrite(outputPath, outSigWav, Fs);
%sound(outSigWav,Fs); %放出输出音频

end

