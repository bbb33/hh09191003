clear;
disp('Welcome to a text-based menu-driven program for Audio processing and analysis');
disp('Press a -- Perform FIR filtering');
disp('Press b -- Extract signal segments');
disp('Press c -- Calculate DFT and energy for low/high frequency regions');
disp('Press d -- Modelling of energy values using Gaussian PDFs');
disp('Press e -- Exit the program');
strResponse = input('Please make your choice: ', 's');
global folderPath; folderPath =  'dataTIMIT_labAssign2020_usedToStud\wavOrig\';
global outputPath; outputPath =  'dataTIMIT_labAssign2020_usedToStud\wavFilt\';
global labelPath; labelPath = 'dataTIMIT_labAssign2020_usedToStud\labels\';
global ListData; ListData = importdata('dataTIMIT_labAssign2020_usedToStud\listData.txt');

%global enLFandHF_orig_phS;global enLFandHF_filt_phS;global enLFandHF_orig_phAA;global enLFandHF_filt_phAA;
%%
while (strcmp(strResponse,'e')~=1)
    switch (strResponse)
        case 'a'
%%          
%             %%%%%%%%%%%%%%%%%%%%%%%%the first way for getting file's name
%             [folders,folderNum] = GetFiles(dir(folderPath));%获得文件名
%             foldersName = {folders.name};
%             %disp(folderNum(1));
%            
%             for i = 1:folderNum(1) %循环读取文件夹
%                 filePath = strcat(folderPath,foldersName{1,i});
%                 filterPath = strcat(outputPath,foldersName{1,i});
%                 [files,filesNum] = GetFiles(dir(filePath));
%                 filesName = {files.name};
%                 %disp(filesName);
%                 %disp(['length(filesNum)=' num2str(length(filesNum))]);disp(['i=' num2str(i)]);
%                 for j = 1:filesNum(1)   %循环读取文件夹里的音频文件
%                     file = strcat(filePath,'\',filesName{1,j}); %拼接
%                     disp(file);
%                     finalPath = strcat(filterPath,'\',filesName{1,j});
%                     %disp(['j=' num2str(j)]);
%                     optiona(file,finalPath);
%                 end    
%             end
%             disp('all over');

            
            %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%the second way 
            for i = 1:length(ListData)-1   %循环读取文件夹里的音频文件
                file = strcat(folderPath,ListData{i,1},'.wav'); %拼接
                %disp(file);
                finalPath = strcat(outputPath,ListData{i,1},'.wav');
                
                optiona(file,finalPath);
            end    
            disp('all over');
         
        case 'b'
%%
            segOrig_phS = []; segFilt_phS = [];segOrig_phAA = []; segFilt_phAA = [];
            for i = 1:length(ListData)-1
                origPath = strcat(folderPath,ListData{i,1},'.wav');
                filtPath = strcat(outputPath,ListData{i,1},'.wav');
                labelsName = strcat(labelPath,ListData{i,1},'.lab');
                label = importdata(labelsName);
               % disp(labelsName);
                [segOrigS,segFiltS,segOrigAA,segFiltAA] =optionb(label,origPath,filtPath,segOrig_phS, segFilt_phS,segOrig_phAA, segFilt_phAA);
                segOrig_phS = segOrigS; %disp(segOrig_phS)
                segFilt_phS = segFiltS;
                segOrig_phAA = segOrigAA;
                segFilt_phAA = segFiltAA;
            end
            save  dataTIMIT_labAssign2020_usedToStud\segAllData.mat segOrig_phS segFilt_phS segOrig_phAA segFilt_phAA  
            
        case 'c'
%%
            load dataTIMIT_labAssign2020_usedToStud\segAllData.mat
            enLFandHF_orig_phS = optionc(segOrig_phS);
            enLFandHF_filt_phS = optionc(segFilt_phS);
            enLFandHF_orig_phA = optionc(segOrig_phAA);
            enLFandHF_filt_phAA = optionc(segFilt_phAA);
            save dataTIMIT_labAssign2020_usedToStud\enLFandHF_allData.mat enLFandHF_orig_phS enLFandHF_filt_phS enLFandHF_orig_phAA enLFandHF_filt_phAA ;
            
            subplot(241); histogram(enLFandHF_orig_phS(:,1));title('orig_s LF');
            subplot(242); histogram(enLFandHF_orig_phS(:,2));title('orig_s HF')
            subplot(243); histogram(enLFandHF_filt_phS(:,1));title('filt_s LF');
            subplot(244); histogram(enLFandHF_filt_phS(:,2));title('filt_s HF');
            subplot(245); histogram(enLFandHF_orig_phAA(:,1));title('orig_aa LF');
            subplot(246); histogram(enLFandHF_orig_phAA(:,2));title('orig_aa HF');
            subplot(247); histogram(enLFandHF_filt_phAA(:,1));title('filt_aa LF');
            subplot(248); histogram(enLFandHF_filt_phAA(:,2));title('filt_aa LF');
           
        case 'd'
 %%
            load dataTIMIT_labAssign2020_usedToStud\matlab.mat;
            format short g ;
            [DL_origS,avgL_origS,DH_origS,avgH_origS]= optiond(enLFandHForig_phS);
            [DL_filtS,avgL_filtS,DH_filtS,avgH_filtS] = optiond(enLFandHFfilt_phS);
            [DL_origAA,avgL_origAA,DH_origAA,avgH_origAA] = optiond(enLFandHForig_phAA);
            [DL_filtAA,avgL_filtAA,DH_filtAA,avgH_filtAA] = optiond(enLFandHFfilt_phAA);
            histfit(enLFandHForig_phS(:,1))

            DallData =  [DL_origS.^0.5 avgL_origS ;DH_origS.^0.5 avgH_origS;
                         DL_filtS.^0.5 avgL_filtS ;DH_filtS.^0.5 avgH_filtS;
                         DL_origAA.^0.5 avgL_origAA; DH_origAA.^0.5 avgH_origAA;
                         DL_filtAA.^0.5 avgL_filtAA ;DH_filtAA.^0.5 avgH_filtAA]
        otherwise
            disp('incorrect choice - please enter again');
    end
    strResponse = input('Please make your choice: ', 's');
end
