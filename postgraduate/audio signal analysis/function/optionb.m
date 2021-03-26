function [segOrigS,segFiltS,segOrigAA,segFiltAA] = optionb(label,origPath,filtPath,segOrig_phS,segFilt_phS,segOrig_phAA,segFilt_phAA)
%UNTITLED4 Summary of this function goes here
%   Detailed explanation goes here
segOrigS = segOrig_phS ;segFiltS = segFilt_phS; segOrigAA = segOrig_phAA; segFiltAA = segFilt_phAA;
j = 1;p = 1;
for i = 1:length(label)
    labelName = strsplit(label{i},' ');
    if(labelName{1,3} == 's')
        timePhStart = str2double(labelName{1,1});
        timePhEnd = str2double(labelName{1,2});
       % disp(timePhStart)
        [wavOrig,fsO] = audioread(origPath);
        [wavFilt,fsF] = audioread(filtPath);
        
        timeSegStart = round((timePhStart + timePhEnd)/2/10000)/1000-0.01 ;
        timeSegEnd =  round((timePhStart + timePhEnd)/2/10000)/1000+0.01;
        
        %disp(length(wavOrig(fsO*startTime+1:1:fsO*endTime,1)));
        segOrigS= [segOrig_phS;transpose(wavOrig( round(fsO*timeSegStart*1000)/1000:round(fsO*timeSegEnd*1000)/1000,1))];
        segOrig_phS = segOrigS;
        segFiltS= [segFilt_phS;transpose(wavFilt(round(fsF*timeSegStart*1000)/1000:round(fsF*timeSegEnd*1000)/1000,1))];
        segFilt_phS = segFiltS;
        if strcmp(origPath,'dataTIMIT_labAssign2020_usedToStud\wavOrig\MDPK0\SA1.wav') && (j == 1)
          fs = 8000 ;X = (0:160)./fs*1000;
          subplot(413)
          plot(X,transpose(wavOrig(round(fsO*timeSegStart*1000)/1000:round(fsO*timeSegEnd*1000)/1000,1)));xlabel('t/ms');ylabel('magnitude');
          title('Figures of the extracted signal segment of the first occurrence of the phoneme`s in the files: wavOrig/MDPK0/SA1.wav');
          
          subplot(414);
          plot(X,transpose(wavFilt(round(fsF*timeSegStart*1000)/1000:round(fsF*timeSegEnd*1000)/1000,1)));xlabel('t/ms');ylabel('magnitude');
          title('Figures of the extracted signal segment of the first occurrence of the phoneme`s in the files: wavFilt/MDPK0/SA1.wav');
          
          j = 2;
          disp(size(segFilt_phS));
          disp(size(segOrig_phS));
        end
        
     elseif(strcmp(labelName{1,3},'aa'))
        timePhStart = str2double(labelName{1,1});
        timePhEnd = str2double(labelName{1,2});
       % disp(timePhStart)
        [wavOrig,fsO] = audioread(origPath);
        [wavFilt,fsF] = audioread(filtPath);
        
        timeSegStart = round((timePhStart + timePhEnd)/2/10000)/1000-0.01;
        timeSegEnd =  round((timePhStart + timePhEnd)/2/10000)/1000 +0.01;
        
        %disp(length(wavOrig(round(fsO*timeSegStart*1000)/1000:round(fsO*timeSegEnd*1000)/1000,1)));
        segOrigAA= [segOrig_phAA;transpose(wavOrig(round(fsO*timeSegStart*1000)/1000:round(fsO*timeSegEnd*1000)/1000,1))];
        segOrig_phAA = segOrigAA;
        segFiltAA= [segFilt_phAA;transpose(wavFilt(round(fsF*timeSegStart*1000)/1000:round(fsF*timeSegEnd*1000)/1000,1))];
        segFilt_phAA = segFiltAA;
        if strcmp(origPath,'dataTIMIT_labAssign2020_usedToStud\wavOrig\MDPK0\SA1.wav') && (p == 1)
          fs = 8000 ;X = (0:160)./fs*1000;
          
          subplot(411)
          plot(X,transpose(wavOrig(round(fsO*timeSegStart*1000)/1000:round(fsO*timeSegEnd*1000)/1000,1)));xlabel('t/ms');ylabel('magnitude');
          title('Figures of the extracted signal segment of the first occurrence of the phoneme`aa in the files: wavOrig/MDPK0/SA1.wav');
          
         subplot(412);
          plot(X,transpose(wavFilt(round(fsF*timeSegStart*1000)/1000:round(fsF*timeSegEnd*1000)/1000,1)));xlabel('t/ms');ylabel('magnitude');
          title('Figures of the extracted signal segment of the first occurrence of the phoneme`aa in the files: wavFilt/MDPK0/SA1.wav');
          p =2;
          disp(size(segFilt_phAA));
          disp(size(segOrig_phAA));
        end
    end
  
end
end

